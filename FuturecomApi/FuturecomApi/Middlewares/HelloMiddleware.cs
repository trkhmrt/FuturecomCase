using System;
namespace FuturecomApi.Middlewares
{
	public class HelloMiddleware
	{
		    private readonly RequestDelegate _next;

    public HelloMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Middleware'ın çalıştığı her istekte "Merhaba dünya" yazdır
        System.Console.WriteLine("Merhaba dünya");

        // Sonraki middleware'e devam et
        await _next(context);
    }
}

	
}

