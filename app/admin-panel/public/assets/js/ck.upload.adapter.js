class UploadAdapter {
    constructor(loader) {
        this.loader = loader
    }

    upload() {
        return this.loader.file.then(
            (file) =>
                new Promise((resolve, reject) => {
                    this._initRequest()
                    this._initListeners(resolve, reject, file)
                    this._sendRequest(file)
                })
        )
    }

    _initRequest() {
        const xhr = (this.xhr = new XMLHttpRequest())

        // íŒŒì¼ì—…ë¡œë“œë¥¼ ì²˜ë¦¬í•  ê²½ë¡œë¥¼ ìž‘ì„±í•´ ì¤€ë‹¤.
        xhr.open('POST', '/editor/upload', true)

        // laravel ìš© í† í°ì„ í•¨ê»˜ ë³´ë‚´ì¤€ë‹¤. (ë¡œê·¸ì¸ í•œ ìœ ì €ë§Œ í—ˆìš©)
        xhr.setRequestHeader(
            'X-CSRF-TOKEN',
            document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        )
        xhr.responseType = 'json'
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr
        const loader = this.loader
        const genericErrorText = 'íŒŒì¼ì—…ë¡œë“œ ì‹¤íŒ¨ - ê´€ë¦¬ìžì—ê²Œ ë¬¸ì˜í•˜ì„¸ìš”.'

        xhr.addEventListener('error', (err) => {
            // console.log(err)
            reject(genericErrorText)
        })
        xhr.addEventListener('abort', () => reject())
        xhr.addEventListener('load', () => {
            const response = xhr.response
            if (!response || response.error) {
                return reject(
                    response && response.error ? response.error.message : genericErrorText
                )
            }

            resolve({
                default: response.url, //ì—…ë¡œë“œëœ íŒŒì¼ ì£¼ì†Œ
            })
        })
    }

    _sendRequest(file) {
        const data = new FormData()
        data.append('upload', file)
        this.xhr.send(data)
    }
}