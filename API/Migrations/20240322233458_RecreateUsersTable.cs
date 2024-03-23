using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class RecreateUsersTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3d754335-db39-4611-b39a-828d00c513e9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4636e8e9-cac5-4268-bd6f-d3cdd1b08dfb");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7ea0e930-1c12-4b49-a362-03bdc554eb12", null, "Admin", "ADMIN" },
                    { "ac972586-a4fd-4da8-845b-4e4c6c9ecc9c", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7ea0e930-1c12-4b49-a362-03bdc554eb12");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ac972586-a4fd-4da8-845b-4e4c6c9ecc9c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3d754335-db39-4611-b39a-828d00c513e9", null, "Admin", "ADMIN" },
                    { "4636e8e9-cac5-4268-bd6f-d3cdd1b08dfb", null, "User", "USER" }
                });
        }
    }
}
