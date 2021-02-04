using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class HsaDetailsAndHsaAccountTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Hsa_Account_Type",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Type = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hsa_Account_Type", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Hsa_Class_Details",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CarryForwardYears = table.Column<int>(type: "INTEGER", nullable: false),
                    ExcludeDental = table.Column<bool>(type: "INTEGER", nullable: false),
                    ExcludeDrug = table.Column<bool>(type: "INTEGER", nullable: false),
                    ExcludeExtendedHealth = table.Column<bool>(type: "INTEGER", nullable: false),
                    ExcludeVision = table.Column<bool>(type: "INTEGER", nullable: false),
                    ClassId = table.Column<int>(type: "INTEGER", nullable: false),
                    HsaAccountTypeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hsa_Class_Details", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Hsa_Class_Details_Class_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Class",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Hsa_Class_Details_Hsa_Account_Type_HsaAccountTypeId",
                        column: x => x.HsaAccountTypeId,
                        principalTable: "Hsa_Account_Type",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hsa_Class_Details_ClassId",
                table: "Hsa_Class_Details",
                column: "ClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Hsa_Class_Details_HsaAccountTypeId",
                table: "Hsa_Class_Details",
                column: "HsaAccountTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hsa_Class_Details");

            migrationBuilder.DropTable(
                name: "Hsa_Account_Type");
        }
    }
}
