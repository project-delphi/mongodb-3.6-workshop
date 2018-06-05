conn = new Mongo('mongodb://localhost:27017/demo?replicaSet=rs');
db = conn.getDB('demo');
collection = db.stock;

const insertOps = {
  $match: { operationType: 'insert' },
};

const updateOps = null;

const changeStreamCursor = collection.watch([
  csFilter === 0 ? insertOps : updateOps,
]);

pollStream(changeStreamCursor);
// resumeStream(changeStreamCursor, true);

const pollStream = (cursor) => {
  while (!cursor.isExhausted()) {
    if (cursor.hasNext()) {
      const change = cursor.next();
      // this is where you should insert your change stream processing logic - in this demo example, we're simply printing the change stream JSON document to the console
      print(JSON.stringify(change, null, 2));
    }
  }
  pollStream(cursor);
};
// INSERT resumeStream() FUNCTION HERE

function sleepFor(sleepDuration) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}
