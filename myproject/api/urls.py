from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register, get_user, NewsListView, games_list, items_list, CartView, AddToCartView, RemoveFromCartView, OrderHistoryView, CreateOrderView, LastNewsView
from django.urls import path

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register/", register),
    path("user/", get_user),
    path("news/", NewsListView.as_view()),
    path('games/', games_list),
    path('items/', items_list),
    path("cart/", CartView.as_view()),
    path("cart/add/", AddToCartView.as_view()),
    path("cart/remove/", RemoveFromCartView.as_view()),
    path("cart/buy/", CreateOrderView.as_view()),
    path("orders/", OrderHistoryView.as_view()),
    path("news/last/", LastNewsView.as_view()),
]
