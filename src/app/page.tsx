
import type { Metadata } from 'next'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Đảm bảo CSS được tải

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'HomePage',
  description: 'Description',
}

export default function Home() {

  return (
    <div >
      hello
    </div>
  )
}
