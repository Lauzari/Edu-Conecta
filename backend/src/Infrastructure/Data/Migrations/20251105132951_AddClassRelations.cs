using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddClassRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Subjects_subjectId",
                table: "Classes");

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
                name: "zoomLink",
                table: "Classes",
                newName: "ZoomLink");

            migrationBuilder.RenameColumn(
                name: "techRequirements",
                table: "Classes",
                newName: "TechRequirements");

            migrationBuilder.RenameColumn(
                name: "teacherId",
                table: "Classes",
                newName: "TeacherId");

            migrationBuilder.RenameColumn(
                name: "subjectId",
                table: "Classes",
                newName: "SubjectId");

            migrationBuilder.RenameColumn(
                name: "startDate",
                table: "Classes",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "endDate",
                table: "Classes",
                newName: "EndDate");

            migrationBuilder.RenameColumn(
                name: "classShift",
                table: "Classes",
                newName: "ClassShift");

            migrationBuilder.RenameColumn(
                name: "classDescription",
                table: "Classes",
                newName: "ClassDescription");

            migrationBuilder.RenameColumn(
                name: "classId",
                table: "Classes",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Classes_subjectId",
                table: "Classes",
                newName: "IX_Classes_SubjectId");

            migrationBuilder.CreateTable(
                name: "ClassStudents",
                columns: table => new
                {
                    ClassesId = table.Column<int>(type: "int", nullable: false),
                    StudentsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassStudents", x => new { x.ClassesId, x.StudentsId });
                    table.ForeignKey(
                        name: "FK_ClassStudents_Classes_ClassesId",
                        column: x => x.ClassesId,
                        principalTable: "Classes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassStudents_Users_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Classes_TeacherId",
                table: "Classes",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassStudents_StudentsId",
                table: "ClassStudents",
                column: "StudentsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_Subjects_SubjectId",
                table: "Classes",
                column: "SubjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Classes_Users_TeacherId",
                table: "Classes",
                column: "TeacherId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Subjects_SubjectId",
                table: "Classes");

            migrationBuilder.DropForeignKey(
                name: "FK_Classes_Users_TeacherId",
                table: "Classes");

            migrationBuilder.DropTable(
                name: "ClassStudents");

            migrationBuilder.DropIndex(
                name: "IX_Classes_TeacherId",
                table: "Classes");

            migrationBuilder.RenameColumn(
                name: "ZoomLink",
                table: "Classes",
                newName: "zoomLink");

            migrationBuilder.RenameColumn(
                name: "TechRequirements",
                table: "Classes",
                newName: "techRequirements");

            migrationBuilder.RenameColumn(
                name: "TeacherId",
                table: "Classes",
                newName: "teacherId");

            migrationBuilder.RenameColumn(
                name: "SubjectId",
                table: "Classes",
                newName: "subjectId");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Classes",
                newName: "startDate");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Classes",
                newName: "endDate");

            migrationBuilder.RenameColumn(
                name: "ClassShift",
                table: "Classes",
                newName: "classShift");

            migrationBuilder.RenameColumn(
                name: "ClassDescription",
                table: "Classes",
                newName: "classDescription");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Classes",
                newName: "classId");

            migrationBuilder.RenameIndex(
                name: "IX_Classes_SubjectId",
                table: "Classes",
                newName: "IX_Classes_subjectId");

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
                name: "FK_Classes_Subjects_subjectId",
                table: "Classes",
                column: "subjectId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Classes_classId",
                table: "Users",
                column: "classId",
                principalTable: "Classes",
                principalColumn: "classId");
        }
    }
}
