using Microsoft.EntityFrameworkCore.Migrations;

namespace calendar_backend.Migrations.CustomizationPresetsDb
{
    public partial class CustomizationPresets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomizationPresets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PresetName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrdinaryColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompellingColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImportantColor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpperPanelScrollSpeed = table.Column<int>(type: "int", nullable: false),
                    BottomPanelScrollSpeed = table.Column<int>(type: "int", nullable: false),
                    BottomPanelScrollDistance = table.Column<int>(type: "int", nullable: false),
                    FontFamily = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomizationPresets", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomizationPresets");
        }
    }
}
