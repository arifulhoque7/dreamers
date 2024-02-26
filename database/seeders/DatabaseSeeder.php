<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Modules\Document\Database\Seeders\DocumentDatabaseSeeder;
use Modules\Language\Database\Seeders\LanguageTableSeeder;
use Modules\OpenAiCreativityLevel\Database\Seeders\OpenAiCreativityLevelDatabaseSeeder;
use Modules\OpenAiLanguage\Database\Seeders\OpenAiLanguageSeederTableSeeder;
use Modules\OpenAiModel\Database\Seeders\OpenAiModelDatabaseSeeder;
use Modules\OpenAiResolution\Database\Seeders\OpenAiResolutionDatabaseSeeder;
use Modules\OpenAiTone\Database\Seeders\OpenAiToneDatabaseSeeder;
use Modules\Setting\Database\Seeders\SettingSeeder;
use Modules\Template\Database\Seeders\TemplateDatabaseSeeder;
use Modules\TemplateCategory\Database\Seeders\TemplateCategoryDatabaseSeeder;
use Modules\WorkBook\Database\Seeders\WorkBookDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            LanguageTableSeeder::class,
            RoleTableSeeder::class,
            SettingSeeder::class,
        ]);

    }
}