namespace ShopWebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddWishListModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.WishLists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        ProductId = c.Int(nullable: false),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Products", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("dbo.User", t => t.ApplicationUser_Id)
                .Index(t => t.ProductId)
                .Index(t => t.ApplicationUser_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.WishLists", "ApplicationUser_Id", "dbo.User");
            DropForeignKey("dbo.WishLists", "ProductId", "dbo.Products");
            DropIndex("dbo.WishLists", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.WishLists", new[] { "ProductId" });
            DropTable("dbo.WishLists");
        }
    }
}
