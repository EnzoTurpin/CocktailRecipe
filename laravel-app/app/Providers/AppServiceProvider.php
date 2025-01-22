<?php

namespace App\Providers;

use App\Services\MonService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(MonService::class, function ($app) {
            return new MonService();
        });
    }
    public function boot()
    {
        // Déclaration de la directive custom "bonjour"
        Blade::directive('bonjour', function ($expression) {
            return "<?php echo 'Bonjour ' . $expression; ?>";
});
}
}