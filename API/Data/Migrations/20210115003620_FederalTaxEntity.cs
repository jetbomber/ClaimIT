using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class FederalTaxEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Federal_Tax",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TaxPercentage = table.Column<double>(type: "REAL", nullable: false),
                    TaxTypeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Federal_Tax", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Federal_Tax_Tax_Type_TaxTypeId",
                        column: x => x.TaxTypeId,
                        principalTable: "Tax_Type",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Federal_Tax_TaxTypeId",
                table: "Federal_Tax",
                column: "TaxTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Federal_Tax");
        }
    }
}
