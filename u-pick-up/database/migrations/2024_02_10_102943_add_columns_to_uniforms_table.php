<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('uniform', function (Blueprint $table) {
            $table->string('year_level')->nullable()->after('uniform_type');
            $table->string('course')->nullable()->after('year_level');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('uniform', function (Blueprint $table) {
            //
        });
    }
};
