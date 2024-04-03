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
            src="https://www.loom.com/embed/0d5001529c904d848af3174f780683c3?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
        <div id="about">
          <div className='text-center mt-4 font-bold'>About Project</div>
          <div className='bg-neutral-500 rounded-lg m-4 p-4 font-bold'>
            <p className='p-4 m-4'>
              Quimer is a CBT (Computer Based Test) System that allows users
              to create and take custom tests and equally prep for external exams
              like JAMB, WAEC or NECO using the exam bodies past questions.
              It is aimed at solving most of the limitations attached to the
              traditional paper-based test system and also the existing CBT systems.
            </p>
            <p className='text-center'>Here are some of the limitation:</p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-center'>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Complex User Interface</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Limited Performance Analytics</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Non-Scalable for Educational Institutions</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Restricted Platform Compatibility</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Difficult Integration with Learning Management Systems</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Limited Test Accessibility</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>High Cost of Printing and Distribution</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Risk of Loss or Damage to Test Materials</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Inefficient Test Administration and Grading</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Limited Test Security and Prevention of Cheating</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Inflexibility in Test Format and Structure</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Difficulty in Test Result Analysis and Reporting</p>
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
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Intuitive User Interface</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Comprehensive Performance Analytics</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Scalable Solution for Educational Institutions</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Customizable Test Creation</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Multi-platform Compatibility</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Seamless Integration with Learning Management Systems</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Automated Test Grading</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Unlimited Test Accessibility</p>
              <p className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>Efficient Test Administration and Grading</p>
            </div>
          </div>
        </div>
        <div id="team">
          <p className='text-center font-bold'>Dev Team</p>
          <div className='bg-neutral-500 rounded-lg m-4 p-4 font-bold'>
            <p className='text-center'>
              Built as Final Portfolio Project for
              <Link href='https://holbertonschool.com' target='_blank' rel='noopener noreferrer' className='text-black hover:text-amber-500'> Holberton School</Link>
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-center'>
              <div className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>
                <p className='text-amber-500'>Rahmat Folorunsho</p>
                <p>UI/UX/Graphics, Frontend</p>
                <div className='flex- flex-col items-center justify-center space-x-2'>
                  <Link href='https://github.com/rahma-cloud' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Github</Link>
                  <Link href='https://twitter.com/rahma_ix' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Twitter</Link>
                  <Link href='https://www.linkedin.com/in/rahmat-folorunsho-873256189' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>LinkedIn</Link>
                </div>
              </div>
              <div className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>
                <p className='text-amber-500'>Ifeanyi Akamigbo</p>
                <p>Frontend, Backend</p>
                <div className='flex- flex-col items-center justify-center space-x-2'>
                  <Link href='https://github.com/valentine1244' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Github</Link>
                  <Link href='https://twitter.com/akamigboi' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>Twitter</Link>
                  <Link href='https://www.linkedin.com/in/ifeanyi-akamigbo-9678ba192' target='_blank' rel='noopener noreferrer' className='hover:text-amber-500'>LinkedIn</Link>
                </div>
              </div>
              <div className='bg-neutral-600 p-2 rounded-lg hover:animate-pulse'>
                <p className='text-amber-500'>Leonard Nzekwe</p>
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
      <div className='sticky bottom-0 bg-neutral-500 p-2 my-4 mx-auto w-fit rounded-lg font-bold text-sm'>
        <div className='flex flex-row items-center justify-center space-x-2'>
          <Link href='https://github.com/leonardnzekwe/quimer.git' target='_blank' rel='noopener noreferrer' className='hover:bg-amber-600 bg-neutral-600 p-1 rounded-lg'>Github Repo</Link>
          <Link href='https://www.loom.com/share/0d5001529c904d848af3174f780683c3' target='_blank' rel='noopener noreferrer' className='hover:bg-amber-600 bg-neutral-600 p-1 rounded-lg'>Demo Video</Link>
          <Link href={process.env.NEXT_PUBLIC_BACKEND_URL || ''} target='_blank' rel='noopener noreferrer' className='hover:bg-amber-500 bg-neutral-600 p-1 rounded-lg'>API Core</Link>
          <Link href='https://docs.netrobase.dev/quimer-docs' target='_blank' rel='noopener noreferrer' className='hover:bg-amber-600 bg-neutral-600 p-1 rounded-lg'>Rest API Docs</Link>
          <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}graphql/` || ''} target='_blank' rel='noopener noreferrer' className='hover:bg-amber-600 bg-neutral-600 p-1 rounded-lg'>GraphQL Playground</Link>
        </div>
      </div>
      <Link href='#home' className='fixed bottom-0 right-0 m-4 hover:text-amber-500'>Back to Top</Link>
    </div>
  );
}
