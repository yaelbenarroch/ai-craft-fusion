
# AudioViz AI

AudioViz AI is an advanced audio analysis and visualization platform that leverages machine learning to extract musical features from audio files. This end-to-end project showcases sophisticated audio processing techniques with a beautiful, interactive interface.

![AudioViz AI Demo](https://github.com/yourusername/audioviz-ai/blob/main/screenshots/demo.png)

## Features

- **Advanced Audio Visualization**: Interactive waveform and frequency visualizations that respond to audio playback
- **Machine Learning Analysis**: Extract musical features including genre, BPM, key, and instrument detection
- **Interactive Web Interface**: Built with React, Framer Motion, and Tailwind CSS for a modern, responsive UI
- **Streamlit Companion App**: Extended analysis capabilities in a Python-based companion application

## Live Demo

- [React Application](https://audioviz-ai.netlify.app)
- [Streamlit App](https://audioviz-ai-streamlit.streamlit.app)

## Project Structure

### Web Application (React)

The frontend application provides a sleek interface for audio file upload, playback, and visualization:

- Real-time audio waveform visualization
- Dynamic frequency visualization 
- Interactive audio player with playback controls
- Feature extraction and analysis results

### Streamlit Application (Python)

The companion Streamlit app offers more detailed analysis tools:

- Comprehensive audio feature extraction
- Genre classification with confidence scores
- Advanced 3D visualizations of audio features
- Audio fingerprinting and similarity analysis

## Technical Implementation

### Frontend (React)
- React with TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Web Audio API for audio processing

### Backend & ML Components
- Python for audio processing and machine learning
- Librosa for audio feature extraction
- TensorFlow/PyTorch for ML models
- Streamlit for the companion data app

## Getting Started

### Prerequisites
- Node.js 16+
- Python 3.8+
- pip

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/audioviz-ai.git
cd audioviz-ai
```

2. Install frontend dependencies
```bash
npm install
```

3. Start the React development server
```bash
npm run dev
```

4. Install Python dependencies (for Streamlit app)
```bash
pip install -r requirements.txt
```

5. Run the Streamlit app
```bash
streamlit run streamlit_app.py
```

## Data Sources

This project can use audio files from various sources:

- User-uploaded audio files
- Sample audio tracks included in the project
- Public datasets like GTZAN Genre Collection or FMA (Free Music Archive)

## Machine Learning Models

The project uses several machine learning models for different tasks:

1. **Genre Classification**: Convolutional Neural Network trained on spectrograms
2. **BPM Detection**: Beat tracking algorithms combined with ML regression
3. **Instrument Recognition**: Multi-label classification model
4. **Mood Detection**: Models trained on audio features correlated with emotional responses

## Future Enhancements

- Integration with music streaming APIs
- Real-time microphone input analysis
- Collaborative filtering for music recommendations
- Extended ML features for deeper audio analysis

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Librosa](https://librosa.org/) for audio analysis
- [TensorFlow](https://www.tensorflow.org/) for machine learning
- [Streamlit](https://streamlit.io/) for the data app
- [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/) for the frontend
