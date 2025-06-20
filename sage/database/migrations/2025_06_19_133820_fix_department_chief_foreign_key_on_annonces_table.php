<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('annonces', function (Blueprint $table) {
            // Disable foreign key checks
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');

            // Get the actual constraint name from information_schema
            $constraint = DB::selectOne("
                SELECT CONSTRAINT_NAME
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                WHERE TABLE_NAME = 'annonces'
                AND COLUMN_NAME = 'department_chief_id'
                AND REFERENCED_TABLE_NAME IS NOT NULL
            ");

            if ($constraint) {
                // Drop using the actual constraint name
                $table->dropForeign([$constraint->CONSTRAINT_NAME]);
            }

            // Change column to nullable
            $table->unsignedBigInteger('department_chief_id')->nullable()->change();

            // Add new foreign key
            $table->foreign('department_chief_id')
                  ->references('id')
                  ->on('department_chiefs')
                  ->onDelete('set null');

            // Re-enable foreign key checks
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        });
    }

    public function down(): void
    {
        Schema::table('annonces', function (Blueprint $table) {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');

            // Drop current constraint
            $constraint = DB::selectOne("
                SELECT CONSTRAINT_NAME
                FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
                WHERE TABLE_NAME = 'annonces'
                AND COLUMN_NAME = 'department_chief_id'
                AND REFERENCED_TABLE_NAME IS NOT NULL
            ");

            if ($constraint) {
                $table->dropForeign([$constraint->CONSTRAINT_NAME]);
            }

            // Change column back to NOT NULL
            $table->unsignedBigInteger('department_chief_id')->nullable(false)->change();

            // Re-add cascade constraint
            $table->foreign('department_chief_id')
                  ->references('id')
                  ->on('department_chiefs')
                  ->onDelete('cascade');

            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        });
    }
};
