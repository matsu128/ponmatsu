import { FaTiktok, FaInstagram, FaYoutube } from 'react-icons/fa'
import Link from 'next/link'

const socialLinks = [
  {
    name: 'TikTok',
    icon: FaTiktok,
    url: 'https://www.tiktok.com/@ponmatsu_house'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://www.instagram.com/ponmatsu_house/'
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    url: 'https://www.youtube.com/@ponmatsu_house'
  }
]

export const SocialLinks = () => {
  return (
    <div className="w-full px-6">
      <div className="relative py-4">
        {/* 上下の装飾的な線 */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        
        {/* SNSアイコン */}
        <div className="flex justify-center gap-8">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <link.icon className="text-2xl text-gray-700" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 