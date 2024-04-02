'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  return (
    <div className='text-white'>
      {/* Header Section */}
      <div className='relative'>
        <Image
          className='object-cover w-full h-full'
          src='/quimer_home.jpg'
          fill={true}
          alt='Home Background'
        />
        <div id="home" className='text-white text-lg bg-black/70 relative'>
          {/* Nav Section */}
          <div className='flex flex-row p-5 top-0 sticky'>
            <Link href="/" className='left-0 text-amber-500 text-lg hover:text-white'>Quimer 🤗</Link>
            <div className="ml-auto space-x-3">
              <Link href='#about' className='hover:text-amber-500'>About Project</Link>
              <Link href='#feature' className='hover:text-amber-500'>Features</Link>
              <Link href='#team' className='hover:text-amber-500'>Dev Team</Link>
            </div>
          </div>
          <div className='flex flex-col items-center h-screen justify-center space-y-5'>
            <div className='capitalise text-center mb-4 font-bold'>
              <p className='text-5xl'>Prepare, Practice, Perform</p>
              <p className='text-3xl'>With <span className='animate-pulse text-amber-500'>Quimer 🤗</span> your Prep Buddy</p>
            </div>
            <Link
              href="/auth/signup"
              className="bg-neutral-600 rounded-lg px-20 py-1 hover:bg-amber-500 font-bold"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      {/* Main Section */}
      <div className='flex flex-col items-center justify-center space-y-5'>
        {/* Demo Video Section */}
        <div className="relative w-full p-4 pb-[52.8125%]">
          <iframe
            src="https://www.loom.com/embed/1ec9d169ebc84533aa0ae9bfec13c741?sid=f6d40414-29e5-4455-ad32-c1442a3dbda3?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
        <div id="about">
          <div className='text-center mt-4 font-bold'>About Project</div>
          <div className='bg-neutral-500 rounded-lg m-4 p-4 font-bold'>
            <p className='p-4 m-4'>
              Quimer is a comprehensive computer-based testing system designed to
              enhance the assessment process in educational institutions.
              It addresses the limitations of traditional testing methods by
              providing a secure, efficient, and user-friendly platform for
              both educators and students.
            </p>
            <p className='text-center'>Here are some of the limitation:</p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-center'>
              <p className='bg-neutral-600 p-2 rounded-lg'>Lack of Adaptive Testing Environment</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Inadequate Security Measures</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Complex User Interface</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Limited Performance Analytics</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Delayed Feedback System</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Non-Scalable for Educational Institutions</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Fixed Test Formats</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Restricted Platform Compatibility</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Difficult Integration with Learning Management Systems</p>
            </div>
            <p className='p-4 m-4'>
              These limitation is what we hope to solve,
              So whether you&apos;re a school administrator looking to modernize your
              exam process or a student aiming to excel in your studies,
              Quimer is your ultimate solution.
            </p>
          </div>
        </div>
        <div id="feature">
          <p className='text-center font-bold'>Features</p>
          <div className='bg-neutral-500 rounded-lg m-4 p-4 font-bold'>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-center'>
              <p className='bg-neutral-600 p-2 rounded-lg'>Adaptive Testing Environment</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Robust Security Measures</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Intuitive User Interface</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Comprehensive Performance Analytics</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Instant Feedback System</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Scalable Solution for Educational Institutions</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Customizable Test Creation</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Multi-platform Compatibility</p>
              <p className='bg-neutral-600 p-2 rounded-lg'>Seamless Integration with Learning Management Systems</p>
            </div>
          </div>
        </div>
        <div id="team">
          <p className='text-center font-bold'>Dev Team</p>
          <div className='bg-neutral-500 rounded-lg m-4 p-4 font-bold'>
            <p className='text-center'>
              Built as Final Portfolio Project for
              <Link href='https://holbertonschool.com' target='_blank' rel='noopener noreferrer' className='text-gray-800 hover:text-amber-500'> Holberton School</Link>
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-center'>
              <div className='bg-neutral-600 p-2 rounded-lg'>
                <p className='text-gray-800'>Rahmat Folorunsho</p>
                <p>UI/UX/Graphics, Frontend</p>
                <div className='flex- flex-col items-center justify-center space-x-2'>
                  <Link href='https://github.com/rahma-cloud' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Github</Link>
                  <Link href='https://twitter.com/rahma_ix' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Twitter</Link>
                  <Link href='https://www.linkedin.com/in/rahmat-folorunsho-873256189' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>LinkedIn</Link>
                </div>
              </div>
              <div className='bg-neutral-600 p-2 rounded-lg'>
                <p className='text-gray-800'>Ifeanyi Akamigbo</p>
                <p>Frontend, Backend</p>
                <div className='flex- flex-col items-center justify-center space-x-2'>
                  <Link href='https://github.com/valentine1244' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Github</Link>
                  <Link href='https://twitter.com/akamigboi' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Twitter</Link>
                  <Link href='https://www.linkedin.com/in/ifeanyi-akamigbo-9678ba192' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>LinkedIn</Link>
                </div>
              </div>
              <div className='bg-neutral-600 p-2 rounded-lg'>
                <p className='text-gray-800'>Leonard Nzekwe</p>
                <p>Backend, DevOps</p>
                <div className='flex- flex-col items-center justify-center space-x-2'>
                  <Link href='https://github.com/leonardnzekwe' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Github</Link>
                  <Link href='https://twitter.com/leonardnzekwe' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Twitter</Link>
                  <Link href='https://www.linkedin.com/in/leonardnzekwe' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>LinkedIn</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <div className='sticky bottom-0 bg-neutral-500 p-2 my-4 mx-auto w-fit rounded-lg font-bold'>
        <div className='flex flex-row items-center justify-center space-x-5'>
          <Link href='https://github.com/leonardnzekwe/quimer.git' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Github Repo</Link>
          <Link href={process.env.NEXT_PUBLIC_BACKEND_URL || ''} target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>API Core</Link>
          <Link href='https://docs.netrobase.dev/quimer-docs' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Rest API Docs</Link>
          <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}graphql/` || ''} target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>GraphQL Playground</Link>
        </div>
      </div>
      <Link href='#home' className='fixed bottom-0 right-0 m-4 hover:text-amber-500'>Back to Top</Link>
    </div>
  );
}
