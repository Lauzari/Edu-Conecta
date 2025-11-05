using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ModifyProfessorRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfessorRequests_Subjects_SubjectId",
                table: "ProfessorRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_ProfessorRequests_Users_UserId1",
                table: "ProfessorRequests");

            migrationBuilder.DropTable(
                name: "ClassUser");

            migrationBuilder.DropIndex(
                name: "IX_ProfessorRequests_UserId1",
                table: "ProfessorRequests");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "ProfessorRequests");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ProfessorRequests");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "ProfessorRequests");

            migrationBuilder.RenameColumn(
                name: "SubjectId",
                table: "ProfessorRequests",
                newName: "ApplicantId");

            migrationBuilder.RenameIndex(
                name: "IX_ProfessorRequests_SubjectId",
                table: "ProfessorRequests",
                newName: "IX_ProfessorRequests_ApplicantId");

            migrationBuilder.AddColumn<int>(
                name: "classId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_classId",
                table: "Users",
                column: "classId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProfessorRequests_Users_ApplicantId",
                table: "ProfessorRequests",
                column: "ApplicantId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Classes_classId",
                table: "Users",
                column: "classId",
                principalTable: "Classes",
                principalColumn: "classId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfessorRequests_Users_ApplicantId",
                table: "ProfessorRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Classes_classId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_classId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "classId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "ApplicantId",
                table: "ProfessorRequests",
                newName: "SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_ProfessorRequests_ApplicantId",
                table: "ProfessorRequests",
                newName: "IX_ProfessorRequests_SubjectId");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "ProfessorRequests",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "ProfessorRequests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "ProfessorRequests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ClassUser",
                columns: table => new
                {
                    ClassesclassId = table.Column<int>(type: "int", nullable: false),
                    StudentsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassUser", x => new { x.ClassesclassId, x.StudentsId });
                    table.ForeignKey(
                        name: "FK_ClassUser_Classes_ClassesclassId",
                        column: x => x.ClassesclassId,
                        principalTable: "Classes",
                        principalColumn: "classId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassUser_Users_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProfessorRequests_UserId1",
                table: "ProfessorRequests",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_ClassUser_StudentsId",
                table: "ClassUser",
                column: "StudentsId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProfessorRequests_Subjects_SubjectId",
                table: "ProfessorRequests",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProfessorRequests_Users_UserId1",
                table: "ProfessorRequests",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
