namespace ShopWebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddImageToIdentityModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "Image", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "Image");
        }
    }
}
