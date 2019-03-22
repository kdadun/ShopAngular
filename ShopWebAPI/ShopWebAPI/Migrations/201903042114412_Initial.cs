namespace ShopWebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.OrderIteams", "OrderId", "dbo.Orders");
            DropForeignKey("dbo.OrderIteams", "ProductId", "dbo.Products");
            DropIndex("dbo.OrderIteams", new[] { "OrderId" });
            DropIndex("dbo.OrderIteams", new[] { "ProductId" });
            AlterColumn("dbo.OrderIteams", "OrderId", c => c.Int(nullable: false));
            AlterColumn("dbo.OrderIteams", "ProductId", c => c.Int(nullable: false));
            CreateIndex("dbo.OrderIteams", "OrderId");
            CreateIndex("dbo.OrderIteams", "ProductId");
            AddForeignKey("dbo.OrderIteams", "OrderId", "dbo.Orders", "orderId", cascadeDelete: true);
            AddForeignKey("dbo.OrderIteams", "ProductId", "dbo.Products", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.OrderIteams", "ProductId", "dbo.Products");
            DropForeignKey("dbo.OrderIteams", "OrderId", "dbo.Orders");
            DropIndex("dbo.OrderIteams", new[] { "ProductId" });
            DropIndex("dbo.OrderIteams", new[] { "OrderId" });
            AlterColumn("dbo.OrderIteams", "ProductId", c => c.Int());
            AlterColumn("dbo.OrderIteams", "OrderId", c => c.Int());
            CreateIndex("dbo.OrderIteams", "ProductId");
            CreateIndex("dbo.OrderIteams", "OrderId");
            AddForeignKey("dbo.OrderIteams", "ProductId", "dbo.Products", "Id");
            AddForeignKey("dbo.OrderIteams", "OrderId", "dbo.Orders", "orderId");
        }
    }
}
