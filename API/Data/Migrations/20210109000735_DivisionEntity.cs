using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class DivisionEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Division",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DivisionNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    DivisionName = table.Column<string>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    City = table.Column<string>(type: "TEXT", nullable: true),
                    PostalCode = table.Column<string>(type: "TEXT", nullable: true),
                    ContactPersonName = table.Column<string>(type: "TEXT", nullable: true),
                    ContactPersonPhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    ContactPersonPhoneNumberExt = table.Column<string>(type: "TEXT", nullable: true),
                    ContactPersonEmailAddress = table.Column<string>(type: "TEXT", nullable: true),
                    ContactPersonFax = table.Column<string>(type: "TEXT", nullable: true),
                    GeneralAdminFee = table.Column<double>(type: "REAL", nullable: false),
                    CompanyId = table.Column<int>(type: "INTEGER", nullable: false),
                    ProvinceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Division", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Division_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Division_Province_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Province",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Division_CompanyId",
                table: "Division",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Division_ProvinceId",
                table: "Division",
                column: "ProvinceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Division");
        }
    }
}
