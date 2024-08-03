export default function Privacy() {

// rendering components for not logged in users
return (
    <div className="relative">
        <div className="background"></div>
        <div className="content ml-16 mt-8 w-1/2 flex flex-col">
            <h1 className="text-2xl font-bold mb-3">Terms of Service</h1>
            <p>Welcome to Molike, where you can get movie and TV recommendations based on your preferences. By using our site, you agree to our terms of service.</p>

            <b className="mt-7 mb-2 text-xl">Privacy</b>
            <p>Please refer to our <a className="text-purple-500" href={`${process.env.NEXTAUTH_URL}/privacy`}>Privacy Policy</a></p>

            <b className="mt-7 mb-2 text-xl">Use of Service</b>
            <p>Our web app is provided for personal use only. You may not use our service for any commercial purpose.</p>

            <b className="mt-7 mb-2 text-xl">Tokens</b>
            <p>We provide tokens to users for free, and they reset weekly. We reserve the right to change this system at any time. Tokens are not property of the user and they do not have any value. We reserve the right to delete the your tokens for any reason.</p>

            <b className="mt-7 mb-2 text-xl">Changes to Service</b>
            <p>We reserve the right to change our service at any time without notice.</p>

            <b className="mt-7 mb-2 text-xl">Termination</b>
            <p>We may terminate your account at any time for any reason.</p>

            <b className="mt-7 mb-2 text-xl">Changes to these Terms of Service</b>
            <p>We may update these Terms of Service from time to time. If we make any material changes, we will notify you via email</p>
            <p className="mb-9">If you have any questions or concerns about these Terms of Service, please contact us at support@molike.net.</p>

            <b className="mt-7 mb-2 text-xl">Entire Agreement</b>
            <p>These terms of service, along with our <a className="text-purple-500" href={`${process.env.NEXTAUTH_URL}/privacy`}>Privacy Policy</a>, constitute the entire agreement between you and us.</p>

        </div>
    </div>
)

}