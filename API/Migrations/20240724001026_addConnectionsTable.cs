using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class addConnectionsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "81a12120-d3e0-4a69-ae7c-b04912960cc1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dcf921f1-12e0-4a51-a02b-1d3585469372");

            migrationBuilder.CreateTable(
                name: "UserConnections",
                columns: table => new
                {
                    Car = table.Column<string>(type: "text", nullable: false),
                    userName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserConnections", x => new { x.Car, x.userName });
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "46eed3e0-9118-4662-b7e9-26027c46f4a1", null, "Admin", "ADMIN" },
                    { "ea2c0550-3ced-4f14-8a51-1343a4a22c61", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserConnections");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "46eed3e0-9118-4662-b7e9-26027c46f4a1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ea2c0550-3ced-4f14-8a51-1343a4a22c61");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "81a12120-d3e0-4a69-ae7c-b04912960cc1", null, "Admin", "ADMIN" },
                    { "dcf921f1-12e0-4a51-a02b-1d3585469372", null, "User", "USER" }
                });
        }
    }
}
