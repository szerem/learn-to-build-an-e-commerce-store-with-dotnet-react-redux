using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class OrderEntityAdded2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address_Zip",
                table: "Orders",
                newName: "ShippingAddress_Zip");

            migrationBuilder.RenameColumn(
                name: "Address_State",
                table: "Orders",
                newName: "ShippingAddress_State");

            migrationBuilder.RenameColumn(
                name: "Address_FullName",
                table: "Orders",
                newName: "ShippingAddress_FullName");

            migrationBuilder.RenameColumn(
                name: "Address_Country",
                table: "Orders",
                newName: "ShippingAddress_Country");

            migrationBuilder.RenameColumn(
                name: "Address_City",
                table: "Orders",
                newName: "ShippingAddress_City");

            migrationBuilder.RenameColumn(
                name: "Address_Address2",
                table: "Orders",
                newName: "ShippingAddress_Address2");

            migrationBuilder.RenameColumn(
                name: "Address_Address1",
                table: "Orders",
                newName: "ShippingAddress_Address1");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "33c7b040-8885-493f-8dff-b1908a17ae4f");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "a7148d63-b7d6-43c4-83f6-3ecb210a24f7");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Zip",
                table: "Orders",
                newName: "Address_Zip");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_State",
                table: "Orders",
                newName: "Address_State");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_FullName",
                table: "Orders",
                newName: "Address_FullName");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Country",
                table: "Orders",
                newName: "Address_Country");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_City",
                table: "Orders",
                newName: "Address_City");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Address2",
                table: "Orders",
                newName: "Address_Address2");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Address1",
                table: "Orders",
                newName: "Address_Address1");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "7b471215-4a65-4970-a7fd-9507d784507a");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "04a5a184-d0b2-4fd9-8e33-fcb54739be3d");
        }
    }
}
