import pickle
import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Load the model
model = pickle.load(open('E:/Sneh Learning/House Price Prediction/house_price_model.pkl', 'rb'))

@api_view(['GET'])
def predict(request):
    # Get query parameters
    area = float(request.GET.get('area'))
    bedrooms = int(request.GET.get('bedrooms'))
    location = int(request.GET.get('location'))
    age = int(request.GET.get('age'))

    # Create a DataFrame with feature names
    input_data = pd.DataFrame({
        'area': [area],
        'bedrooms': [bedrooms],
        'location': [location],
        'age': [age]
    })

    # Make the prediction
    prediction = model.predict(input_data)[0]
    return Response({'prediction': prediction})
