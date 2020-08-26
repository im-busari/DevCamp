### 1. Describe the process of how would you check if a server OR a service (http, http over tls, icmp) on a server is running?
In order to verify if the server is running you can send a PING command. It uses the ICMP to send out an "echo request" to the destination device and it gets back an "echo response" as long as the device you are trying to reach is still active.

For example, if we "ping" gitlab.mentormate.bg what happens is we send 4 packets to the server and we check 4 times if the server is going to respond. At the end we have a section called "Ping statistics" that summarize the operation, letting us know whether we have received response to all of our 4 requests or some got lost along the way:

"""
Ping statistics for 192.168.4.100:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 38ms, Maximum = 71ms, Average = 52ms
"""

If you would like more detailed information about the time and the pathway you can use [tracert] command.


### 2. What services are running on the mentormate gitlab server (i.e. gitlab.mentormate.bg) when you are connected to the VPN and when you are not connected to it?

In order to confirm what services are running on the mentormate GitLab server we will use the [nmap] command. 

Once we connect to the VPN and run "nmap gitlab.mentormate.bg" in the terminal we can see that the following services are active: 

PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
111/tcp open  rpcbind
443/tcp open  https

However if disconnect from the VPN we get an Error/Note message: "Host seems down" and we will be unable to interact with the server.

