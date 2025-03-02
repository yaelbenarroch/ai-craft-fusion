
import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import librosa
import librosa.display
import io
import base64
from PIL import Image
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import plotly.express as px
import plotly.graph_objects as go
import time

# Set page configuration
st.set_page_config(
    page_title="AudioViz AI - Streamlit Demo",
    page_icon="🎵",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main {
        background-color: #f8f9fa;
    }
    .stApp {
        max-width: 1200px;
        margin: 0 auto;
    }
    h1, h2, h3 {
        color: #1e1e1e;
    }
    .stButton>button {
        background-color: #1e1e1e;
        color: white;
        border-radius: 4px;
    }
    .stButton>button:hover {
        background-color: #333;
        color: white;
    }
    .css-1aumxhk {
        max-width: 1200px;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.title("🎵 AudioViz AI")
st.markdown("### Advanced Audio Analysis & Visualization Demo")
st.markdown("---")

# Sidebar
with st.sidebar:
    st.header("About")
    st.write("""
    AudioViz AI is an advanced audio analysis platform that uses machine learning 
    to extract features from audio files and provide insightful visualizations.
    
    This Streamlit demo complements the main React application, allowing for 
    more detailed analysis and visualization of audio features.
    """)
    
    st.markdown("---")
    
    st.subheader("Sample Tracks")
    sample_track = st.selectbox(
        "Choose a sample track:",
        ["None", "Electronic Beat", "Jazz Sample", "Classical Piano", "Pop Song", "Rock Guitar"]
    )
    
    st.markdown("---")
    
    st.subheader("Settings")
    fft_size = st.selectbox("FFT Size", [512, 1024, 2048, 4096])
    hop_length = st.selectbox("Hop Length", [256, 512, 1024])
    
    st.markdown("---")
    
    st.markdown("**Note:** For a full experience, upload your own audio file.")

# Main content
tab1, tab2, tab3, tab4 = st.tabs(["Upload & Analyze", "Feature Extraction", "Genre Classification", "Advanced Visualization"])

with tab1:
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.header("Upload Audio File")
        uploaded_file = st.file_uploader("Choose an audio file", type=['mp3', 'wav', 'ogg'])
        
        if sample_track != "None" and not uploaded_file:
            st.info(f"Using sample: {sample_track}")
            # In a real app, you would load the sample file
            # For this demo, we'll simulate it
            sample_duration = 30  # seconds
        
        if uploaded_file is not None or sample_track != "None":
            st.success("Audio file loaded successfully!")
            
            if uploaded_file is not None:
                # For demo purposes, we'll create dummy data
                # In a real app, you would load the audio file
                sample_duration = 45  # seconds
            
            # Display audio player
            if uploaded_file:
                st.audio(uploaded_file, format='audio/mp3')
            else:
                # Placeholder for sample audio
                st.info("Sample audio player would appear here")
            
            # Audio information
            st.subheader("Audio Information")
            st.json({
                "Duration": f"{sample_duration} seconds",
                "Sample Rate": "44100 Hz",
                "Channels": "Stereo",
                "File Format": "MP3" if uploaded_file else "WAV",
                "File Size": "3.2 MB" if uploaded_file else "2.5 MB"
            })
    
    with col2:
        st.header("Audio Analysis")
        
        if uploaded_file is not None or sample_track != "None":
            # Generate a simulated waveform for demonstration
            analyze_button = st.button("Analyze Audio")
            
            if analyze_button:
                with st.spinner("Analyzing audio..."):
                    # Simulate processing time
                    progress_bar = st.progress(0)
                    for i in range(100):
                        time.sleep(0.01)
                        progress_bar.progress(i + 1)
                    
                    # Display waveform
                    st.subheader("Waveform")
                    fig, ax = plt.subplots(figsize=(10, 2))
                    times = np.linspace(0, sample_duration, sample_duration * 100)
                    amplitude = np.sin(2*np.pi*times) * np.random.randn(len(times))*0.1
                    ax.plot(times, amplitude)
                    ax.set_xlabel('Time (s)')
                    ax.set_ylabel('Amplitude')
                    ax.set_xlim(0, min(10, sample_duration))  # Show first 10 seconds
                    st.pyplot(fig)
                    
                    # Display spectrogram
                    st.subheader("Spectrogram")
                    fig, ax = plt.subplots(figsize=(10, 4))
                    # Generate random spectrogram data
                    spectrogram = np.random.rand(100, 100)
                    img = librosa.display.specshow(spectrogram, x_axis='time', y_axis='log', ax=ax)
                    fig.colorbar(img, ax=ax, format="%+2.f dB")
                    ax.set_title('Mel-frequency spectrogram')
                    st.pyplot(fig)
                    
                    # Analysis Results
                    st.subheader("Analysis Results")
                    col1, col2, col3, col4 = st.columns(4)
                    
                    with col1:
                        st.metric("BPM", f"{np.random.randint(80, 140)}")
                        
                    with col2:
                        keys = ["C Major", "A Minor", "G Major", "E Minor", "D Major"]
                        st.metric("Key", keys[np.random.randint(0, len(keys))])
                        
                    with col3:
                        moods = ["Energetic", "Calm", "Happy", "Melancholic", "Intense"]
                        st.metric("Mood", moods[np.random.randint(0, len(moods))])
                    
                    with col4:
                        st.metric("Energy", f"{np.random.randint(50, 95)}%")
                
                    st.success("Analysis complete!")
        else:
            st.info("Please upload an audio file or select a sample track to begin analysis.")

with tab2:
    st.header("Audio Feature Extraction")
    
    if uploaded_file is not None or sample_track != "None":
        st.write("Extracted features from the audio file:")
        
        # Create tabs for different feature types
        feature_tab1, feature_tab2, feature_tab3 = st.tabs(["Spectral Features", "Temporal Features", "MFCC"])
        
        with feature_tab1:
            st.subheader("Spectral Features")
            
            # Generate random spectral feature data
            spectral_data = {
                "Spectral Centroid": np.random.rand(100) * 2000 + 1000,
                "Spectral Bandwidth": np.random.rand(100) * 1000 + 500,
                "Spectral Contrast": np.random.rand(100) * 50,
                "Spectral Rolloff": np.random.rand(100) * 3000 + 2000
            }
            
            # Plot the features
            feature_names = list(spectral_data.keys())
            selected_feature = st.selectbox("Select spectral feature to visualize:", feature_names)
            
            fig, ax = plt.subplots(figsize=(10, 4))
            frames = np.arange(len(spectral_data[selected_feature]))
            ax.plot(frames, spectral_data[selected_feature])
            ax.set_xlabel('Frames')
            ax.set_ylabel(selected_feature)
            ax.set_title(f'{selected_feature} over time')
            st.pyplot(fig)
            
            # Display statistics
            st.subheader("Feature Statistics")
            stats_df = pd.DataFrame({
                "Feature": feature_names,
                "Mean": [np.mean(spectral_data[f]) for f in feature_names],
                "Std Dev": [np.std(spectral_data[f]) for f in feature_names],
                "Min": [np.min(spectral_data[f]) for f in feature_names],
                "Max": [np.max(spectral_data[f]) for f in feature_names]
            })
            st.dataframe(stats_df)
        
        with feature_tab2:
            st.subheader("Temporal Features")
            
            # Create a time series plot for zero crossing rate
            times = np.linspace(0, sample_duration, 100)
            zcr = np.random.rand(100) * 0.1 + 0.2
            
            fig = px.line(x=times, y=zcr, labels={"x": "Time (s)", "y": "Zero Crossing Rate"})
            fig.update_layout(title="Zero Crossing Rate Over Time", height=400)
            st.plotly_chart(fig, use_container_width=True)
            
            # Create RMS energy plot
            rms = np.random.rand(100) * 0.3 + 0.1
            
            fig = px.line(x=times, y=rms, labels={"x": "Time (s)", "y": "RMS Energy"})
            fig.update_layout(title="RMS Energy Over Time", height=400)
            st.plotly_chart(fig, use_container_width=True)
            
            # Display statistics in a table
            tempo_stats = pd.DataFrame({
                "Feature": ["Zero Crossing Rate", "RMS Energy", "Tempo", "Onset Strength"],
                "Mean": [np.mean(zcr), np.mean(rms), np.random.randint(80, 140), np.random.rand() * 0.5 + 0.2],
                "Standard Deviation": [np.std(zcr), np.std(rms), np.random.rand() * 10, np.random.rand() * 0.1]
            })
            st.dataframe(tempo_stats)
        
        with feature_tab3:
            st.subheader("Mel-Frequency Cepstral Coefficients (MFCC)")
            
            # Generate random MFCC data
            mfcc_data = np.random.randn(20, 100)  # 20 MFCCs, 100 frames
            
            fig, ax = plt.subplots(figsize=(10, 6))
            img = librosa.display.specshow(mfcc_data, x_axis='time', ax=ax)
            fig.colorbar(img, ax=ax)
            ax.set_title('MFCC')
            st.pyplot(fig)
            
            # Display MFCC statistics
            st.subheader("MFCC Statistics")
            mfcc_means = np.mean(mfcc_data, axis=1)
            mfcc_stds = np.std(mfcc_data, axis=1)
            
            mfcc_stats = pd.DataFrame({
                "MFCC Coefficient": [f"MFCC {i+1}" for i in range(20)],
                "Mean": mfcc_means,
                "Standard Deviation": mfcc_stds
            })
            st.dataframe(mfcc_stats)
    else:
        st.info("Please upload an audio file or select a sample track to extract features.")

with tab3:
    st.header("Genre Classification")
    
    if uploaded_file is not None or sample_track != "None":
        genres = ["Electronic", "Pop", "Rock", "Hip-Hop", "Classical", "Jazz", "Folk"]
        
        # Generate random probabilities for genres
        probs = np.random.rand(len(genres))
        probs = probs / probs.sum()  # Normalize to sum to 1
        
        # Sort by probability
        sorted_indices = np.argsort(probs)[::-1]
        sorted_genres = [genres[i] for i in sorted_indices]
        sorted_probs = probs[sorted_indices]
        
        # Main prediction
        st.subheader("Predicted Genre")
        st.markdown(f"<h2 style='text-align: center; color: #1e1e1e;'>{sorted_genres[0]}</h2>", unsafe_allow_html=True)
        st.markdown("<p style='text-align: center; color: #666;'>Primary genre classification</p>", unsafe_allow_html=True)
        
        # Classification confidence
        st.subheader("Classification Confidence")
        fig = px.bar(
            x=sorted_probs * 100, 
            y=sorted_genres,
            orientation='h',
            labels={"x": "Confidence (%)", "y": "Genre"},
            color=sorted_probs,
            color_continuous_scale="Viridis"
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
        
        # Feature importance
        st.subheader("Feature Importance")
        features = ["Spectral Centroid", "Zero Crossing Rate", "Spectral Contrast", 
                   "Tempo", "MFCC 1", "MFCC 2", "MFCC 3", "MFCC 4"]
        importances = np.random.rand(len(features))
        importances = importances / importances.sum()
        
        fig = px.bar(
            x=importances * 100,
            y=features,
            orientation='h',
            labels={"x": "Importance (%)", "y": "Feature"},
            color=importances,
            color_continuous_scale="Oranges"
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
        
        # Sub-genre analysis
        if sorted_genres[0] == "Electronic":
            st.subheader("Sub-Genre Analysis")
            subgenres = ["House", "Techno", "Drum & Bass", "Ambient", "Dubstep"]
            subgenre_probs = np.random.rand(len(subgenres))
            subgenre_probs = subgenre_probs / subgenre_probs.sum()
            
            fig = px.pie(
                values=subgenre_probs,
                names=subgenres,
                title="Electronic Sub-Genres",
                color_discrete_sequence=px.colors.sequential.Plasma_r
            )
            fig.update_traces(textposition='inside', textinfo='percent+label')
            st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("Please upload an audio file or select a sample track for genre classification.")

with tab4:
    st.header("Advanced Visualization")
    
    if uploaded_file is not None or sample_track != "None":
        viz_type = st.selectbox(
            "Select visualization type:", 
            ["3D Feature Space", "Feature Correlation", "Tempo Distribution", "Audio Fingerprint"]
        )
        
        if viz_type == "3D Feature Space":
            st.subheader("3D Feature Space Visualization")
            
            # Generate random points in 3D space
            num_points = 100
            x = np.random.rand(num_points) * 10
            y = np.random.rand(num_points) * 10
            z = np.random.rand(num_points) * 10
            
            # Create a color scale based on a fourth dimension (e.g., energy)
            color = np.random.rand(num_points)
            
            fig = px.scatter_3d(
                x=x, y=y, z=z, 
                color=color,
                labels={"x": "Spectral Centroid", "y": "Tempo", "z": "Spectral Contrast", "color": "Energy"},
                title="Audio Features in 3D Space"
            )
            fig.update_layout(height=700)
            st.plotly_chart(fig, use_container_width=True)
            
            st.write("""
            This visualization shows how the audio sample relates to different genres in a 3D feature space. 
            Each dimension represents a key audio feature, and the color represents the energy level.
            """)
            
        elif viz_type == "Feature Correlation":
            st.subheader("Feature Correlation Matrix")
            
            # Create a list of features
            features = ["Spectral Centroid", "Spectral Bandwidth", "Spectral Contrast", 
                      "Zero Crossing Rate", "Tempo", "RMS Energy", 
                      "MFCC 1", "MFCC 2", "MFCC 3", "MFCC 4"]
            
            # Generate a random correlation matrix
            num_features = len(features)
            corr_matrix = np.random.rand(num_features, num_features) * 2 - 1  # Values between -1 and 1
            
            # Make it symmetric
            corr_matrix = (corr_matrix + corr_matrix.T) / 2
            np.fill_diagonal(corr_matrix, 1)
            
            # Create correlation heatmap
            fig = px.imshow(
                corr_matrix,
                x=features,
                y=features,
                color_continuous_scale="RdBu_r",
                labels=dict(x="Feature", y="Feature", color="Correlation"),
                zmin=-1, zmax=1
            )
            fig.update_layout(height=700)
            st.plotly_chart(fig, use_container_width=True)
            
            st.write("""
            The correlation matrix shows how different audio features relate to each other. 
            Positive correlations (blue) indicate features that tend to increase together,
            while negative correlations (red) indicate features where one tends to increase as the other decreases.
            """)
            
        elif viz_type == "Tempo Distribution":
            st.subheader("Tempo Distribution Among Genres")
            
            # Generate random tempo data for different genres
            genres = ["Electronic", "Pop", "Rock", "Hip-Hop", "Classical", "Jazz", "Folk"]
            
            # Random tempo distributions for each genre
            electronic = np.random.normal(128, 10, 100)
            pop = np.random.normal(110, 15, 100)
            rock = np.random.normal(115, 20, 100)
            hiphop = np.random.normal(95, 12, 100)
            classical = np.random.normal(85, 25, 100)
            jazz = np.random.normal(100, 18, 100)
            folk = np.random.normal(90, 15, 100)
            
            # Create figure
            fig = go.Figure()
            
            fig.add_trace(go.Violin(x=np.full(100, 'Electronic'), y=electronic, name='Electronic', box_visible=True, meanline_visible=True))
            fig.add_trace(go.Violin(x=np.full(100, 'Pop'), y=pop, name='Pop', box_visible=True, meanline_visible=True))
            fig.add_trace(go.Violin(x=np.full(100, 'Rock'), y=rock, name='Rock', box_visible=True, meanline_visible=True))
            fig.add_trace(go.Violin(x=np.full(100, 'Hip-Hop'), y=hiphop, name='Hip-Hop', box_visible=True, meanline_visible=True))
            fig.add_trace(go.Violin(x=np.full(100, 'Classical'), y=classical, name='Classical', box_visible=True, meanline_visible=True))
            fig.add_trace(go.Violin(x=np.full(100, 'Jazz'), y=jazz, name='Jazz', box_visible=True, meanline_visible=True))
            fig.add_trace(go.Violin(x=np.full(100, 'Folk'), y=folk, name='Folk', box_visible=True, meanline_visible=True))
            
            # Add vertical line for current track tempo
            current_tempo = np.random.randint(80, 140)
            fig.add_shape(
                type="line", line=dict(color="red", width=2, dash="dash"),
                y0=0, y1=160, x0=current_tempo, x1=current_tempo,
                xref="paper", yref="y"
            )
            
            fig.update_layout(
                title=f"Tempo Distribution by Genre (Current Track: {current_tempo} BPM)",
                xaxis_title="Genre",
                yaxis_title="Tempo (BPM)",
                violingap=0, violingroupgap=0,
                height=600
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            st.write("""
            This visualization shows how the tempo of the current track compares to typical tempo 
            distributions across different music genres. The red dashed line represents the detected tempo of the current track.
            """)
            
        elif viz_type == "Audio Fingerprint":
            st.subheader("Audio Fingerprint Visualization")
            
            # Generate a random "fingerprint" visualization
            # In a real app, this would be a chromagram or a more sophisticated audio fingerprint
            
            # Create a random chromagram (12 pitch classes over time)
            chromagram = np.random.rand(12, 100)  # 12 pitches, 100 time frames
            
            # Plot it
            fig, ax = plt.subplots(figsize=(12, 6))
            img = librosa.display.specshow(
                chromagram, 
                y_axis='chroma', 
                x_axis='time',
                ax=ax
            )
            fig.colorbar(img, ax=ax)
            ax.set_title('Chromagram')
            st.pyplot(fig)
            
            # Create a more abstract "fingerprint" visualization
            st.subheader("Unique Audio Signature")
            
            # Generate random "fingerprint" data
            # (this would be actual audio features in a real app)
            fingerprint_data = np.random.rand(20, 30)
            
            fig = px.imshow(
                fingerprint_data,
                labels=dict(x="Time", y="Feature", color="Magnitude"),
                color_continuous_scale="Viridis"
            )
            fig.update_layout(height=500)
            st.plotly_chart(fig, use_container_width=True)
            
            st.write("""
            The audio fingerprint is a unique signature derived from the audio content.
            It captures the distinctive characteristics of the track and can be used for 
            music identification and similarity matching.
            """)
    else:
        st.info("Please upload an audio file or select a sample track for advanced visualization.")

# Add GitHub repository link
st.sidebar.markdown("---")
st.sidebar.markdown("""
### Project Repository
Find the complete code on GitHub:
[AudioViz AI Repository](https://github.com/yourusername/audioviz-ai)
""")

# Add footer
st.markdown("""
---
<p style="text-align: center; color: #666;">
    AudioViz AI - An advanced audio analysis and visualization project<br>
    Built with Python, TensorFlow, and Streamlit
</p>
""", unsafe_allow_html=True)
