I. Here is a list of some popular AWS services. Do a quick research and explain shortly what each of them is for and why we would like to use them.

####AWS Lambda
This is a compute service that runs a backend code and responds to different events. By using Lambda we can focus 
on building the backend and the service will take care of the rest (capacity, scaling, patching, administration 
of the infrastructure). The service is very low cost, and it's easy to learn since we can use any 3rd party library. 
The code run on AWS Lambda is called `Lambda function`. We can choose between uploading our code as a zip file, design
it inside the integrated environment, or select from `prebuild` function samples. Using AWS Lambda would significantly 
speed up the development process and save a lot of money in certain situations.  


####Amazon SNS
SNS stands for simple notification service. This is a fully managed messaging service for both system-to-system and 
app-to-person communication. A common scenario of usage is when you want to send mails or sms to your subscribers. 
It's easy to setup and the rpice is 0.50$ per 1 million Amazon SNS Requests. 


####Amazon CloudFront
Amazon CloudFront is a fast content delivery network (CDN) service. It delivers the content through a worldwide 
network of data centres called edge locations. The service securely delivers data, videos, 
applications, and APIs to customers globally. We can encrypt all the information with a Free certificate from 
Amazon Certificate Manager, or just use our own certificate. Whenever a user requests a content we're serving with CloudFront,
he will be routed to the edge location that  provides the `lowest latency` in his case. This ensures that the content is 
delivered with the best possible performance.

####Amazon ElastiCache
ElastiCache is an in-memory data store and cache. Using this service we can afford to build data-intensive apps and 
boost the performance of already existing databases. ElastiCache supports 2 open source in-memory caching engines: Memcached
and Redis. It is designed to simplify the setup, operation, and scaling of memcached and Redis. Processes like patching,
backing up and restoring data sets, dynamically adding or removing capabilities, are managed automatically. It takes a minutes 
to add caching or in-memory layer to our application architecture thanks to the AWS Management Console.


####Amazon Cognito
The main web-page of this service truly explains its purpose - "Let Amazon Cognito handle authentication". This is a 
simple user identity and data synchronization service that helps us to securely manage and sync app data for our users
across multiple mobile or connected devices. 


####Amazon API Gateway
This management tool stands between a client and a collection of backend services. Amazon API Gateway is a service for 
creating, publishing, maintaining, monitoring, and securing REST, HTTP and WebSocket APIs at any scale. We can create APIs 
that access web service (such as AWS) or data stored in the AWS Cloud. 
