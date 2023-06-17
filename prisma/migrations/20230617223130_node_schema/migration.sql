-- CreateTable
CREATE TABLE "tbl__tree_node" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "tbl__tree_node_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl__tree_node" ADD CONSTRAINT "tbl__tree_node_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "tbl__tree_node"("id") ON DELETE SET NULL ON UPDATE CASCADE;
