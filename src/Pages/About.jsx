import React from 'react'

function About() {
    return (
        <div className='bg-[#003145] text-white h-auto py-[50px] flex flex-col gap-[40px]'>
            <div className='flex flex-col gap-5'>
                <h1 className='flex justify-center'>About the Hackathon App</h1>
                <p className='w-[50%] mx-auto text-center text-[20px]'>Welcome to the Hackathon App, your all-in-one platform to create, manage, and participate in exciting hackathons! Whether you are a student, a professional, or just someone who loves to solve problems, this app offers a seamless experience for all.</p>
            </div>
            <div className='w-[60%] mx-auto '>
                <ul className='flex flex-col gap-[25px] text-[20px] list-disc'><h2 className='mx-auto'>-:Key Features:-</h2>
                    <li>Create and Manage Hackathons: Organizers can easily set up new hackathons by specifying details like the challenge name, description, dates, and participation rules. The app provides a smooth interface to manage participants, track submissions, and communicate with teams.</li>

                    <li>Participate in Hackathons: As a participant, you can browse through various live and upcoming hackathons, register for them, and collaborate with team members. Track your progress and submit your projects directly through the platform.</li>

                    <li>Countdown Timers and Notifications: Stay informed with real-time countdown timers that keep you updated on when hackathons start and finish. You'll never miss a deadline again!</li>

                    <li>Real-Time Collaboration and Networking: Our platform helps foster innovation by connecting participants and mentors. You can team up with others, ask for guidance, and share knowledge through our integrated communication tools.</li>

                    <li>Simple and Intuitive UI: With a user-friendly interface and modern design, navigating through the app is smooth and easy. Whether you’re new to hackathons or a seasoned participant, you’ll find everything you need without the hassle.</li>
                </ul>
            </div>
            <div className='text-[20px] flex flex-col w-[60%] mx-auto gap-[40px]'>
                <h2 className='flex justify-center'>Why Use This App?</h2>
                <p className='text-center'>For Organizers: Streamline your event management with simple tools to monitor registrations, check submissions, and engage participants throughout the event lifecycle.

                    For Participants: Access multiple hackathons in one place, track your projects, collaborate with others, and showcase your skills. Whether it's coding, design, or problem-solving, this platform empowers you to innovate and succeed.
                </p>
            </div>
        </div>
    )
}

export default About
