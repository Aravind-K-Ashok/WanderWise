private void updateMonthlyBudget() {
        String text = budgetField.getText().trim();
        try {
            double newBudget = Double.parseDouble(text);
            if (newBudget < 0) throw new NumberFormatException();

            user.setMonthlyBudget(newBudget);
            DBHelper.updateUserBudget(user.getUserID(), newBudget);
            statusLabel.setText("✅ Monthly budget updated to ₹" + newBudget);
            statusLabel.repaint();
        } catch (NumberFormatException e) {
            statusLabel.setText("❌ Please enter a valid positive number");
            statusLabel.repaint();
        } catch (SQLException e) {
            statusLabel.setText("❌ Failed to update budget. Please try again.");
            statusLabel.repaint();
            e.printStackTrace();
        }
    }

    private void resetUserPassword() {
        String newPass = new String(passField.getPassword()).trim();
        if (newPass.isEmpty()) {
            statusLabel.setText("❌ Password cannot be empty");
            statusLabel.repaint();
            return;
        }

        user.setPassword(newPass);

        try {
            DBHelper.updateUserPassword(user.getUserID(), newPass);
            statusLabel.setText("✅ Password updated successfully");
            statusLabel.repaint();
            passField.setText("");
        } catch (Exception e) {
            statusLabel.setText("❌ Failed to reset password. Please try again.");
            statusLabel.repaint();
            e.printStackTrace();
        }
    }

    private void updateHistoricalBudget() {
        String selected = (String) monthCombo.getSelectedItem();
        if (selected == null) return;

        String input = historyBudgetField.getText().trim();
        try {
            double budget = Double.parseDouble(input);
            if (budget < 0) throw new NumberFormatException();

            YearMonth ym = YearMonth.parse(selected, ymFormatter);
            user.setBudgetForMonth(ym, budget);
            DBHelper.saveBudgetHistory(user.getUserID(), ym, budget);

            statusLabel.setText("✅ Budget updated for " + ym);
            statusLabel.repaint();
        } catch (NumberFormatException e) {
            statusLabel.setText("❌ Enter a valid budget amount.");
            statusLabel.repaint();
        }
    }