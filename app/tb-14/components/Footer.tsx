import Image from 'next/image'

const Footer = () => {
  const logoImages = [
    '1X2Gaming.webp',
    'AvatarUX.webp',
    'BigTimeGaming.webp',
    'BlueprintGaming.webp',
    'Booongo.webp',
    'CQ9.webp',
    'DragoonSoft.webp',
    'ELK.webp',
    'Evoplay.webp',
    'GameArt.webp',
    'Habanero.webp',
    'Mobilots.webp',
    'NetEnt.webp',
    'NolimitCity.webp',
    'PGSoft.webp',
    'PlayNGo.webp',
    'PlayPearls.webp',
    'PlayStar.webp',
    'Playson.webp',
    'RedTiger.webp',
    'RelaxGaming.webp',
    'ThunderKick.webp',
    'TriplePG.webp',
    'Wazdan.webp',
    'Yggdrasil.webp',
    'asia_gaming.webp',
    'betgames_tv.webp',
    'bota_casino 1.webp',
    'dowin_casino.webp',
    'dream_gaming_casino.webp',
    'evolution.webp',
    'microgaming.webp',
    'playtech.webp',
    'pragmatic_play_live.webp',
    'skywind.webp',
    'taishan_casino.webp',
    'wm_casino.webp'
  ]

  return (
    <footer className="footer-container">
      <div className="footer-logo">
        {logoImages.map((logo, index) => (
          <Image
            key={index}
            src={`/assets/logos/${logo}`}
            alt={`${logo.replace('.webp', '')} logo`}
            width={100}
            height={60}
            style={{ objectFit: 'contain' }}
          />
        ))}
      </div>

      <div className="footer-copyright">
        <p>COPYRIGHT © <span>TAEBAEK</span> ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  )
}

export default Footer
