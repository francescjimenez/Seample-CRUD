import React from 'react';


const Home = () => (
    <section className="container">

        <h1>Question 2</h1>
        <p>Once you app is almost ready, how will you deploy the service to a cloud
hosting? You can try to summarize your solution using</p>
        <p>Always I used the tools they others (normally devops) show me. Only in the part of automation and test if I have participated more closely, because that the functional test are executed on the frontend or app, and this work normally was executed for <b>Jenkins</b>.</p>

        <div className="question">
            <h5>a. CI/CD? How? Which tools?</h5>
            <p>On the last three years I worked in a continuous integration environment, but with different process because the last company was biggest than the current one. Normally the processes and tools were:</p>
            <ul>
                <li>Define branching strategies in git(master could upload to production at any time) and the process to master was:</li>
                <li>
                    <ul>
                        <li>Create a branch with the task id name</li>
                        <li>Git pre-commit: To apply eslint and unit test (in react with jest)</li>
                        <li>Finish the task and merge with master</li>
                        <li>Pull request to master</li>
                        <li>Code reviewing and, if approved, merge to master</li>
                    </ul>
                </li>
                <li>The deploy was started manually and used a <b>Azure Pipeline</b>.</li>
                <li>As the pipeline was configured, the moment that use <b>Jenkins</b>,  or at what time QA confirmed the deployment to production I don't know.</li>
            </ul>
        </div>
        <div className="question">
            <h5>b. Monitoring & Alerts? Any concrete tool?</h5>
            <p>I worked with <b>pingdom</b> or <b>new relic</b>, but more closely with <b>crashlytics</b>, <b>firebase</b> and a differents solutions from mobile stores because he was responsible for the deploy of the mobile application.</p>
            <p>New relic I was used to monitorize the performance of the site and to saved the log errors.</p>
        </div>
        <div className="question">
            <h5>c. Logging?</h5>
            <p>In terms of log management in devOps I'm not familiarized with any modern tool. Here we are working with <b>DataDog</b>, and I know the functionality but I don't have a knowledge about this tool. I'm more familiar with <b>New Relic</b> because it has monitoring frontend errors and I haved access to others sections of this tool.</p>
        </div>
        <div className="question">
            <h5>d. Deployment - Microplatform (AMI) vs Kubernetes?</h5>
            <p>I don't dominate about it, I know that an AMI is an entire server image (includes the OS part) and kubernetes is a small user space with just the application code and the required libraries to make it run. Deploying in kubernetes is quicker and the process is more flexible to make it work with the CI/CD tools.</p>
            <p>Also with kubernetes the required server (cpu and memory) can be more suitable than with AMI, which require a predefined instance type to make it run.</p>
        </div>
    </section>
);

export default Home;
