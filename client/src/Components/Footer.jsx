import React from "react";
import { Link } from "react-router-dom";
import { footerLinks } from "../utils/data";
import Logo from '../assest/logo.png'

const FooterColumn = ({ title, links }) => (
    <div className="">
        <h2 className="font-semibold">{title}</h2>
        <ul className="flex flex-col gap-2 font-normal">
            {links.map((link) => <Link href="/don">{link}</Link>)}
        </ul>
    </div>
);
const Footer=()=>{
    return (
        <footer className='bg-white border-t-2 shadow-md border-gray-100 px-10 p-5 '>
        <div className='flex flex-col gap-12 w-full'>
          <div className='flex items-start flex-col'>
            <img
            src={Logo}
             width={215}
             height={38}
             alt='footer logo'
            />
            <p className='text-start text-sm font-normal mt-5 max-w-xs'>
                Talento Acadamy is the World Most Popular Design Platform
            </p>
          </div>
          <div className='flex flex-wrap gap-x-10 justify-start'>
              <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />
              <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
              <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
              <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links} />
              <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links} />
              <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links} />
              <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links} />
          </div>
        </div>
   </footer>
    )
}

export default Footer