using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ErrorTracker.Migrations
{
    public partial class InitialCreateAndSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Action",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Action", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Impact",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Impact", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Priority",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priority", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Status",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Status", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Login = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Error",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    ShortDesc = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    StatusId = table.Column<int>(nullable: true),
                    PriorityId = table.Column<int>(nullable: true),
                    ImpactId = table.Column<int>(nullable: true),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Error", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Error_Impact_ImpactId",
                        column: x => x.ImpactId,
                        principalTable: "Impact",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Error_Priority_PriorityId",
                        column: x => x.PriorityId,
                        principalTable: "Priority",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Error_Status_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Status",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Error_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ErrorHistory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ErrorId = table.Column<int>(nullable: true),
                    ActionId = table.Column<int>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErrorHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ErrorHistory_Action_ActionId",
                        column: x => x.ActionId,
                        principalTable: "Action",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ErrorHistory_Error_ErrorId",
                        column: x => x.ErrorId,
                        principalTable: "Error",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ErrorHistory_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Action",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Ввод" },
                    { 2, "Открытие" },
                    { 3, "Решение" },
                    { 4, "Закрытие" }
                });

            migrationBuilder.InsertData(
                table: "Impact",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Авария" },
                    { 2, "Критичная" },
                    { 3, "Некритичная" },
                    { 4, "Запрос на изменение" }
                });

            migrationBuilder.InsertData(
                table: "Priority",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Очень срочно" },
                    { 2, "Срочно" },
                    { 3, "Несрочно" },
                    { 4, "Совсем несрочно" }
                });

            migrationBuilder.InsertData(
                table: "Status",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Новая" },
                    { 2, "Открытая" },
                    { 3, "Решённая" },
                    { 4, "Закрытая" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Error_ImpactId",
                table: "Error",
                column: "ImpactId");

            migrationBuilder.CreateIndex(
                name: "IX_Error_PriorityId",
                table: "Error",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Error_StatusId",
                table: "Error",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Error_UserId",
                table: "Error",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ErrorHistory_ActionId",
                table: "ErrorHistory",
                column: "ActionId");

            migrationBuilder.CreateIndex(
                name: "IX_ErrorHistory_ErrorId",
                table: "ErrorHistory",
                column: "ErrorId");

            migrationBuilder.CreateIndex(
                name: "IX_ErrorHistory_UserId",
                table: "ErrorHistory",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ErrorHistory");

            migrationBuilder.DropTable(
                name: "Action");

            migrationBuilder.DropTable(
                name: "Error");

            migrationBuilder.DropTable(
                name: "Impact");

            migrationBuilder.DropTable(
                name: "Priority");

            migrationBuilder.DropTable(
                name: "Status");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
