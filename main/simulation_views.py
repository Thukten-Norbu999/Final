from django.shortcuts import render


def simulations(request):
    return render(
        request,
        'simulations/simulations.html'
    )

def cradle(request):
    return render(
        request,
        'simulations/cradle.html'
    )

def simple_pendulum(request):
    return render(
        request,
        'simulations/simple_pendulum.html'
    )

def air_resistance(request):
    return render(
        request,
        'simulations/air_resistance.html'
    )

def projectile(request):
    return render(
        request,
        'simulations/projectile.html'
    )
def chem(request):
    return render(
        request,
        'simulations/chem.html'
    )

def gravity(request):
    return render(
        request,
        'simulations/gravity.html'
    )