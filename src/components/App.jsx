import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

const INITIAL_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export const App = () => {
  const [feedback, setFeedback] = useState({ ...INITIAL_STATE });
  const [showStats, setShowStats] = useState(false);

  const handleFeedback = option => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
    setShowStats(true);
  };

  const { good, neutral, bad } = feedback;
  const total = good + bad + neutral;
  const positivePercentage = total > 0 ? Math.round((good / total) * 100) : 0;

  return (
    <div>
      <Section title="Please Leave Feedback">
        <FeedbackOptions
          options={Object.keys(INITIAL_STATE)}
          onLeaveFeedback={handleFeedback}
        />
      </Section>

      <Section title="Statistics">
        {showStats ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
