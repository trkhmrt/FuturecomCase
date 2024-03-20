using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class Last : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "UserLogs");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ab3a80c1-1a9c-47e2-8163-dac0cec0efd5", "AQAAAAIAAYagAAAAEIF4CkOS6cqtDTYzW+qhN8RbFnUPtjg3x5tZ9Cdsg22pxXQy4V5WVnkqp1S0W3/swg==", "6c2d16c1-4d88-45b3-b369-7f2041359cad" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "UserLogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ad1790ec-9c2f-4d7b-b165-0b3b0c0d3045", "AQAAAAIAAYagAAAAEF0BE04RGD7mUQgl6q5m/7TJB9mYCu0EsOM/sW61uaF+6p3zCyJXfvcP2U8N25I7XQ==", "0f8b2677-8343-4a72-8416-da864b3e30d8" });
        }
    }
}
