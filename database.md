## Data Persistence:

To store a tree in a database, a good and efficient approach is to store each node in a realtional database using tables and relationships
The `Node` model used in the project saves nodes of a tree in a row. This entity represents the nodes of the tree, and each node has a foreign key referencing its parent node.

This allows for efficient querying and navigation of the tree structure. The biggest impact of using relational model is the concurency management.

Transactions on a node can be atomised into rows, which means other transactions on different nodes can take place at the same time.

---

## Design Choices

Following are the deailed information on designed choices

### Table Structure

The nodes table contains columns for id, label, and parentId. The id column serves as the primary key for each node, label stores the label or name of the node, and parentId is a foreign key referencing the parent node's id.

### Parent-Child Relationship

The parent-child relationship is established through the parentId foreign key in the nodes table. Each node references its parent node using this foreign key. By following these relationships, the entire tree structure can be reconstructed.

### Recursive Functions

To retrieve the tree structure, recursive functions are used. The `insertNode` method adds nodes to the tree, while the `retrieveNestedTree` method recursively retrieves the tree structure starting from the root node(s).

---

## Performance Considerations

### Indexing

It's important to ensure proper indexing on the id and parentId columns for efficient querying and traversal of the tree structure.

### Caching

To improve performance, caching mechanisms can be considered implementing , reducing the need for frequent database queries.
I would recommend using `write-around` design pattern of cache.

### Database Optimization

Depending on the scale of the tree and the frequency of updates, the database schema could be optimized using database-specific features (e.g., recursive queries), or implement pagination to handle large trees more efficiently.

---

## Conclusion

The design choices made in this implementation prioritize simplicity, data integrity, and performance.
By utilizing SQL databases and implementing suitable indexing, the tree structure can be efficiently stored and retrieved from a relational database.

This allows for seamless manipulation and traversal of the tree, ensuring smooth operations and optimal performance.
