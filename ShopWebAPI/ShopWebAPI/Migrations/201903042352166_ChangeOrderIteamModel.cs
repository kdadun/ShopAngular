namespace ShopWebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeOrderIteamModel : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.OrderIteams", "UnitPrice", c => c.Double(nullable: false));
            DropColumn("dbo.OrderIteams", "Quantity");
        }
        
        public override void Down()
        {
            AddColumn("dbo.OrderIteams", "Quantity", c => c.Int(nullable: false));
            AlterColumn("dbo.OrderIteams", "UnitPrice", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
    }
}
