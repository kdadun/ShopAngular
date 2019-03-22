namespace ShopWebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRating : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Ratings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        UserId = c.String(),
                        Rate = c.Int(nullable: false),
                        Comment = c.String(),
                        DateCreated = c.DateTime(nullable: false),
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
            DropForeignKey("dbo.Ratings", "ApplicationUser_Id", "dbo.User");
            DropForeignKey("dbo.Ratings", "ProductId", "dbo.Products");
            DropIndex("dbo.Ratings", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Ratings", new[] { "ProductId" });
            DropTable("dbo.Ratings");
        }
    }
}
