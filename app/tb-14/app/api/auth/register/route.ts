import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError)
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!body.username || !body.password || !body.nickname) {
      return NextResponse.json(
        { success: false, error: '필수 정보를 모두 입력해주세요.' },
        { status: 400 }
      )
    }
    
    // Forward request to backend with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout for registration

    try {
      const backendResponse = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': request.headers.get('cookie') || '',
        },
        credentials: 'include',
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Check if response is ok before parsing JSON
      if (!backendResponse.ok) {
        const errorText = await backendResponse.text()
        console.error('Backend registration error:', {
          status: backendResponse.status,
          statusText: backendResponse.statusText,
          body: errorText
        })
        try {
          const errorData = JSON.parse(errorText)
          return NextResponse.json(errorData, { status: backendResponse.status })
        } catch {
          return NextResponse.json(
            { 
              success: false, 
              error: `Backend request failed: ${errorText.substring(0, 200)}`,
              details: process.env.NODE_ENV === 'development' ? errorText : undefined
            },
            { status: backendResponse.status }
          )
        }
      }

      // Parse JSON response
      let data
      try {
        const responseText = await backendResponse.text()
        console.log('Backend response:', {
          status: backendResponse.status,
          statusText: backendResponse.statusText,
          contentType: backendResponse.headers.get('content-type'),
          responseLength: responseText?.length || 0,
          responseText: responseText?.substring(0, 500) || '(empty)'
        })
        
        if (!responseText || !responseText.trim()) {
          console.error('Empty response from backend')
          return NextResponse.json(
            { 
              success: false, 
              error: '백엔드 서버가 빈 응답을 반환했습니다. 백엔드 로그를 확인하세요.',
              details: `Status: ${backendResponse.status} ${backendResponse.statusText}`
            },
            { status: 502 } // Bad Gateway
          )
        }
        data = JSON.parse(responseText)
      } catch (parseError: any) {
        console.error('Failed to parse backend response:', {
          error: parseError,
          message: parseError?.message,
          stack: parseError?.stack
        })
        return NextResponse.json(
          { 
            success: false, 
            error: '백엔드 응답을 처리할 수 없습니다.',
            details: `Parse error: ${parseError?.message || 'Unknown error'}`
          },
          { status: 502 } // Bad Gateway
        )
      }

      // Create Next.js response
      const response = NextResponse.json(data, {
        status: backendResponse.status,
      })

      // Forward cookies from backend
      try {
        const setCookieHeaders = backendResponse.headers.getSetCookie()
        
        if (setCookieHeaders && setCookieHeaders.length > 0) {
          setCookieHeaders.forEach((cookieString: string) => {
            try {
              // Parse cookie string (format: name=value; attribute1=value1; attribute2=value2)
              const parts = cookieString.split(';').map(part => part.trim())
              const [nameValue, ...attributes] = parts
              
              if (nameValue) {
                const equalIndex = nameValue.indexOf('=')
                if (equalIndex > 0) {
                  const name = nameValue.substring(0, equalIndex).trim()
                  const value = nameValue.substring(equalIndex + 1).trim()
                  
                  if (name && value) {
                    const cookieOptions: any = {
                      httpOnly: false, // Next.js cookies API handles httpOnly differently
                      secure: process.env.NODE_ENV === 'production',
                      sameSite: 'lax' as const,
                      path: '/',
                    }
                    
                    // Parse attributes
                    attributes.forEach(attr => {
                      const lowerAttr = attr.toLowerCase()
                      if (lowerAttr === 'httponly') {
                        cookieOptions.httpOnly = true
                      } else if (lowerAttr === 'secure') {
                        cookieOptions.secure = true
                      } else if (lowerAttr.startsWith('samesite=')) {
                        const sameSiteValue = attr.split('=')[1]?.toLowerCase()
                        if (sameSiteValue === 'strict' || sameSiteValue === 'lax' || sameSiteValue === 'none') {
                          cookieOptions.sameSite = sameSiteValue as 'strict' | 'lax' | 'none'
                        }
                      } else if (lowerAttr.startsWith('path=')) {
                        cookieOptions.path = attr.split('=')[1] || '/'
                      } else if (lowerAttr.startsWith('max-age=')) {
                        const maxAge = parseInt(attr.split('=')[1] || '0')
                        if (!isNaN(maxAge)) {
                          cookieOptions.maxAge = maxAge
                        }
                      } else if (lowerAttr.startsWith('expires=')) {
                        // Expires is handled automatically by maxAge
                        const expiresDate = new Date(attr.split('=').slice(1).join('='))
                        if (!isNaN(expiresDate.getTime())) {
                          const maxAge = Math.floor((expiresDate.getTime() - Date.now()) / 1000)
                          if (maxAge > 0) {
                            cookieOptions.maxAge = maxAge
                          }
                        }
                      }
                    })
                    
                    response.cookies.set(name, value, cookieOptions)
                  }
                }
              }
            } catch (cookieError) {
              // Log but don't fail on cookie parsing errors
              console.warn('Failed to parse cookie:', cookieError)
            }
          })
        }
      } catch (cookieError) {
        // Log but don't fail on cookie handling errors
        console.warn('Failed to handle cookies:', cookieError)
      }

      return response

    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      
      // Handle connection errors gracefully
      if (fetchError.code === 'ECONNREFUSED' || fetchError.name === 'AbortError' || fetchError.message?.includes('fetch failed')) {
        console.warn('Backend server is not available:', fetchError.message)
        return NextResponse.json(
          { 
            success: false, 
            error: '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.' 
          },
          { status: 503 } // Service Unavailable
        )
      }
      throw fetchError
    }

  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Provide more specific error messages
    let errorMessage = '서버 오류가 발생했습니다.'
    if (error.message) {
      errorMessage = error.message
    } else if (error.name === 'SyntaxError') {
      errorMessage = '응답 형식 오류가 발생했습니다.'
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
