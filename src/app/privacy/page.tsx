export default function Privacy() {

  // rendering components for not logged in users
  return (
    <div className="relative">
        <div className="background"></div>
        <div className="content ml-16 mt-8 w-1/2 flex flex-col">
            <h1 className="text-2xl font-bold mb-3">Privacy Policy</h1>
            <p>At Molike, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our web application.</p>

            <b className="mt-7 mb-2 text-xl">Information Collection</b>
            <p>When you use our web application, we may collect the following information:</p>
            <ul className="list-disc">
                <li>Name</li>
                <li>Email address</li>
                <li>Recommendation requests made on our web application</li>
                <li>Web application related data, such as tokens left and when they were last reset</li>
                <li>We may also collect information about your computer, including your IP address, operating system, and browser type, for system administration and to improve our web application</li>
            </ul>

            <b className="mt-7 mb-2 text-xl">Cookie Policy</b>
            <p>We use cookies to improve your experience on our web application. Cookies are small text files that are placed on your computer or device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide information to website owners.</p>
            <b className="mt-3">We use cookies to:</b>
            <ul className="list-disc">
                <li>Remember your preferences and settings</li>
                <li>Authenticate and identify you when you use our web application</li>
                <li>Personalize content and advertising</li>
                <li>Analyze how our web application are used</li>

            </ul>
            <p>You can choose to accept or decline cookies. Declining cookies may prevent you from taking full advantage of our web application.</p>

            <b className="mt-7 mb-2 text-xl">Information Use</b>
            <b>We use the information we collect to:</b>
            <ul className="list-disc">
                <li>Provide and improve our web application</li>
                <li>Personalize your experience and provide content and advertising that are relevant to you</li>
                <li>Communicate with you about our web application</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our web application</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            </ul>

            <b className="mt-7 mb-2 text-xl">Information Protection</b>
            <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. We store your personal information on secure servers and use industry-standard security measures to protect your information from loss, theft, and unauthorized access.</p>

            <b className="mt-7 mb-2 text-xl">Information Sharing</b>
            <b>We may share your personal information with third parties in the following circumstances:</b>
            <ul className="list-disc">
                <li>With service providers who perform services on our behalf, such as payment processors, data analytics providers, and customer support providers</li>
                <li>With law enforcement agencies, government agencies, or other third parties as required by law or to protect our rights or the rights of others</li>
                <li>In connection with a merger, acquisition, or sale of all or a portion of our business</li>
            </ul>

            <b className="mt-7 mb-2 text-xl">Your Rights</b>
            <b>You have the following rights with respect to your personal information:</b>
            <ul className="list-disc">
                <li>The right to access your personal information</li>
                <li>The right to request correction or erasure of your personal information</li>
                <li>The right to object to the processing of your personal information</li>
                <li>The right to request restriction of processing of your personal information</li>
                <li>The right to request data portability</li>
            </ul>

            <p>To exercise these rights, please contact us at support@molike.net.</p>

            <b className="mt-7 mb-2 text-xl">Changes to this Privacy Policy</b>
            <p>We may update this Privacy Policy from time to time. If we make any material changes, we will notify you via email</p>
            <p className="mb-9">If you have any questions or concerns about this Privacy Policy, please contact us at support@molike.net.</p>
        </div>
    </div>
  )

}
