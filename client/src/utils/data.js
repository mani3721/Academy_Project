import {RxDashboard} from 'react-icons/rx'
import {AiOutlineSetting} from 'react-icons/ai'
import {PiStudentFill} from 'react-icons/pi'
import {AiOutlineTeam} from 'react-icons/ai'
import {FaUserTie} from 'react-icons/fa'
import {FaClipboardList} from 'react-icons/fa'
import {BiListUl} from 'react-icons/bi'
import {AiOutlineFieldTime} from 'react-icons/ai'
export const MenuItem=[
    {
        name:"Programs",
        key:"programs"
    },
    {
        name:"Admissions",
        key:"programs"
    },
    {
        name:"About",
        key:"programs"
    }, {
        name:"Courses",
        key:"programs"
    }, {
        name:"Careers",
        key:"programs"
    }
]

export const footerLinks = [
    {
      title: 'For developers',
      links: [
        'Go Pro!',
        'Explore development work',
        'Development blog',
        'Code podcast',
        'Open-source projects',
        'Refer a Friend',
        'Code of conduct',
      ],
    },
    {
      title: 'Hire developers',
      links: [
        'Post a job opening',
        'Post a freelance project',
        'Search for developers',
      ],
    },
    {
      title: 'Brands',
      links: [
        'Advertise with us',
      ],
    },
    {
      title: 'Company',
      links: [
        'About',
        'Careers',
        'Support',
        'Media kit',
        'Testimonials',
      ],
    },
    {
      title: 'Directories',
      links: [
        'Development jobs',
        'Developers for hire',
        'Freelance developers for hire',
        'Tags',
        'Places',
      ],
    },
    {
      title: 'Development assets',
      links: [
        'Code Marketplace',
        'GitHub Marketplace',
        'NPM Registry',
        'Packagephobia',
      ],
    },
    {
      title: 'Development Resources',
      links: [
        'Freelancing',
        'Development Hiring',
        'Development Portfolio',
        'Development Education',
        'Creative Process',
        'Development Industry Trends',
      ],
    },
  ];
  

  export const categories = [
    {
      name: 'Dashboard',
      key:"dashboard",
      image: <RxDashboard/>,
    },
    {
      name: 'Schedule',
      image: <AiOutlineFieldTime/>,
      key:"Schedule"
    },
    {
      name:'Courses',
      image: <BiListUl/>,
      key:"cources"
    },
    {
      name: 'Reports',
      image: <FaClipboardList/>,
      key:"Reports"
    },
    {
      name: 'Teams',
      image: <AiOutlineTeam/>,
      key:"Teams"
    },
    {
      name: 'Staffs',
      image: <FaUserTie/>,
      key:"staff"
    },
    {
      name: 'Students',
      key:"studentlist",
      image: <PiStudentFill/>,
    },
    {
      name: 'Settings',
      image: <AiOutlineSetting/>,
    }
  ];



  export const Studentcategories = [
    {
      name: 'Home',
      key:"home",
      image: <RxDashboard/>,
    },
    {
      name: 'Dashboard',
      image: <AiOutlineFieldTime/>,
    },
    {
      name: 'Cources',
      image: <BiListUl/>,
      key:'cources'
    },
    {
      name: 'Messages',
      image: <FaClipboardList/>,
    },
    {
      name: 'Schedule',
      image: <AiOutlineTeam/>,
    },
    {
      name: 'Staffs',
      image: <FaUserTie/>,
    },
    {
      name: 'Settings',
      image: <AiOutlineSetting/>,
    }
  ];