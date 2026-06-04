import streamlit as st

# 1. Page Configuration
st.set_page_config(page_title="Goal Tracker", page_icon="🎯", layout="centered")

# 2. App Title and Description
st.title("🎯 Personal Goal Tracker")
st.write("Welcome! Use this simple app to log your daily milestones and track your progress.")

st.divider()

# 3. User Input Layout
st.subheader("Add a New Goal")
col1, col2 = st.columns([2, 1])

with col1:
    goal_text = st.text_input("What is your goal?", placeholder="e.g., Learn Streamlit layouts...")

with col2:
    category = st.selectbox("Category", ["Tech/Coding", "Finance", "Soft Skills", "Health"])

# 4. Interactive Button Logic
if st.button("Log Goal", type="primary"):
    if goal_text:
        st.success(f"Successfully added to **{category}**!")
        st.info(f"**Current Task:** {goal_text}")
        st.checkbox("Mark as completed!")
    else:
        st.warning("Please type a goal before clicking the button!")
