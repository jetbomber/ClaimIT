using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class CompanyEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CompanyName = table.Column<string>(type: "TEXT", nullable: true),
                    YearEndDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    GroupTerminationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CommencementDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IncludeHsaClaims = table.Column<bool>(type: "INTEGER", nullable: false),
                    IncludeCostPlusClaims = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
