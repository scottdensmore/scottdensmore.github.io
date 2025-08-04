---
layout: post
title: Multi Entity Schema Tables in Windows Azure
author: Scott Densmore
date: 2011-04-13 02:45 -0700
tags:
- conference
- windows
- azure
- git
- security
- career
---

> The source for this is available on [github](https://github.com/scottdensmore/AzureMultiEntitySchema).

### Update

12-31-2012 - Updated the code to work with Azure 1.8 and VS 2012.

**Intro**

When we wrote [Moving Applications to the Cloud](http://msdn.microsoft.com/en-us/library/ff728592.aspx), we talked about doing a-Expense using a multi entity schema yet never implemented this in code. As we finish up V2 to the [Claims Identity Guide](http://claimsid.codeplex.com/), we are thinking of how we go about  updating the other two guides for Windows Azure. I read an [article from Jeffrey Richter](http://www.wintellect.com/Articles/Working%20with%20Azure%20Tables%20with%20Multiple%20Entity%20Schemas%20by%20Jeffrey%20Richter.pdf) about this same issue. I decided to take our a-Expense with Workers reference application and update it to use multi entity schemas based on the article.  I also decided to fix a few bugs that we had as well. Most of this had to do with saving the expenses. In the old way of doing things, we would save expense items, the receipt images, and then the expense header. The first problem is that if you debugged the project things got a little out of sync, you could end up trying to update a reciept url on the expense item before it was saved. Also, if the expense header failed to save, you would have orphaned records that then you would need to create another process to go out and scavenge any orphaned records.

**Implementation**

There has been a lot of code changes since the version shipped for Moving to the Cloud. The major change comes to the save method for the expense repository.

The main changes for this code are the following:

1. Multi Entity Schema for the Expense
2. Remove updates back to the table for Receipt URIs
3. Update the Queue handlers to look for Poison Messages and move to another Queue

**Multi Entity Schema**

The previous version of the project was split into two tables: Expense and ExpenseItems. This create a few problems that needed to be addressed. The first was that you could not create a transaction across the two entities. The way we solved this was to create the ExpenseItem(s) before creating the Expense. If there is a problem between the ExpenseItem and Expense, then there would be orphaned ExpenseItems. This would require a scavenger looking for all the orphaned records. This would all add up to more costs. Now we are going to save the ExpenseItem and Expense in the same table. The following is a diagram of doing this:

![ClaimsNoReceipts](/assets/img/claims-no-receipts.png)

This now lets us have one transaction across the table.

**Remove Updates for Receipts**

In the first version, when you uploaded receipts along with the expense, the code would post a message to a queue that would then update the table with the URI of the thumbnail and receipt images. In this version, we used a more convention based approach. Instead of updating the table, a new property, "HasReceipts", is added so when displaying the receipts the code can tell when there is a receipt and where there is not. Now when there is a receipt the URI is built on the fly and accessed. This saves on the cost of the update to the table. Here is the diagram:

![ClaimsWithReceipt](/assets/img/claims-with-receipt.png)

**Poison Messages**

In the previous version, when a message would be dequeued 5 times it would be deleted, now you have the option of moving it to a new queue.

```csharp
...

try
{
    action(message);
    success = true;
}
catch (Exception)
{
    success = false;
}
finally
{
    if (deadQueue != null && message.DequeueCount > 5)
    {
        deadQueue.AddMessage(message);
    }
    if (success || message.DequeueCount > 5)
    {
        queue.DeleteMessage(message);
    }
}

...
```

QueueCommandHandler.For(exportQueue).Every(TimeSpan.FromSeconds(5)).WithPosionMessageQueue(poisonExportQueue).Do(exportQueueCommand);

**Conclusion
**

This is the beginning of our updates to our [Windows Azure Guidance](http://msdn.microsoft.com/en-us/library/ff898430.aspx). We want to show even better ways of moving and developing applications for the cloud. Go check out the [source](https://github.com/scottdensmore/AzureMultiEntitySchema).
