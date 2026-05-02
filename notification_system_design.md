# Notification System Design

Implemented a simple notification microservice architecture to deliver, store and handle all user notifications. This system enables the sending, receiving and fetching of user specific notifications also mark them as read.


---


## Stage 1
### 1. Send Notification

POST /notifications

Body:
{

"userId": "1605",
message: New Event Available,
"type": "event"

}

### 2. Get Notifications

GET /notifications/:userId

to retrieve all the notifications of a specific user.

### 3. Mark as Read.

PUT /notifications/:id/read

Ticks that notification as read.

---

## Stage 2

MongoDB to store notifications. This is because mongoDB is flexible and has easy scalability.

Any notification is made up of:
* userId
* message
* type
* isRead (boolean)
* createdAt (timestamp)

---

## Stage 3

Problem:
When data grows, it can slow down to fetch unread notifications.

Solution:
Add index on (userId, isRead).

* This prevents complete collection scan.

Optimized query:
Select fetch notifications that satisfy the following conditions: userId =? and isRead =false.

List results in descending createdAt order.
---

## Stage 4
Possible issues:
Large number of notifications.

* Slow response time

Solutions:
* Use caching (Redis)
* Pagination (results per request)
* Async fetching of data.

---

## Stage 5
Problem:
All user notification (notify_all) is not very fast or reliable.

Issues:
Single hand messages are ineffective.
Failure has the ability to halt the whole process.

Solution:
* Take in a message queue (Kafka / RabbitMQ)
* Process notifications asynchronously

Improved flow:
1. Access notification in database.
2. Put job into queue.
3. Worker processes notifications
4. Failures handled separately

---

## Conclusion

The system is also made to be simple, scalable and efficient.
It applies well-formed API design, database indexing and asynchronous processing to process massive notifications.