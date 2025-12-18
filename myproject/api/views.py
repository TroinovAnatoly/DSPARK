from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .models import News, Game, GameItem, Cart, CartItem, Order
from .serializers import NewsSerializer, GameSerializer, GameItemSerializer, CartSerializer, OrderSerializer

class LastNewsView(APIView):
    def get(self, request):
        news = News.objects.order_by("-created_at").first()
        if not news:
            return Response(None)
        serializer = NewsSerializer(news)
        return Response(serializer.data)

class OrderHistoryView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-created_at")

class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart = get_object_or_404(Cart, user=request.user)
        items = CartItem.objects.filter(cart=cart)

        if not items.exists():
            return Response({"error": "Корзина пуста"}, status=400)

        total = 0
        for item in items:
            total += item.total_price()

        order = Order.objects.create(
            user=request.user,
            total_price=total
        )

        items.delete()

        return Response({
            "success": "Покупка завершена",
            "order_id": order.id,
            "total": total
        })

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)

        game_id = request.data.get("game_id")
        item_id = request.data.get("item_id")

        if game_id:
            game = Game.objects.get(id=game_id)
            CartItem.objects.create(cart=cart, game=game)

        if item_id:
            item = GameItem.objects.get(id=item_id)
            CartItem.objects.create(cart=cart, item=item)

        return Response({"success": True})


class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        CartItem.objects.filter(id=request.data["item_id"]).delete()
        return Response({"success": True})


@api_view(['GET'])
def items_list(request):
    items = GameItem.objects.all().order_by('-created_at')
    serializer = GameItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def games_list(request):
    games = Game.objects.all().order_by('-created_at')
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data)


class NewsListView(APIView):
    def get(self, request):
        news = News.objects.all().order_by("-created_at")
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"detail": "Заполните все поля"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"detail": "Пользователь уже существует"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    user.save()

    return Response({"detail": "Пользователь создан"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    return Response({
        "username": request.user.username,
        "first_name": request.user.first_name,
        "last_name": request.user.last_name
    })