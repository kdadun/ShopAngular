namespace ShopWebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUsernameToRatingModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Ratings", "Username", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Ratings", "Username");
        }
    }
}
