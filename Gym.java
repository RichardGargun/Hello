import java.util.Arrays;

public class Gym {

    public int calculateWeights(int[] weights) throws IllegalArgumentException {
        if (weights.length == 1) {
            return 0;
        }
        if (weights.length < 1 || weights.length > 1000) {
            throw new IllegalArgumentException("input data length should be between 1 and 1000");
        }
        int totalWeight = calculateTotalWeight(weights);
        if (totalWeight > 10000) {
            throw new IllegalArgumentException("Total weight shouldn't be more than 10000 poinds");
        }
        int maxWeightOnSide = totalWeight / 2;
        int left = 0;
        int right = 0;
        int lastIndex = weights.length - 1;
        Arrays.sort(weights);
        while (lastIndex >= 0) {
            if (maxWeightOnSide < weights[lastIndex]) {
                maxWeightOnSide = calculateTotalWeight(Arrays.copyOf(weights, lastIndex)) / 2;
                lastIndex--;
                continue;
            }
            if (left + weights[lastIndex] <= maxWeightOnSide) {
                left += weights[lastIndex];
            } else if (right + weights[lastIndex] <= maxWeightOnSide) {
                right += weights[lastIndex];
            }
            lastIndex--;
        }
        return left == right ? left + right : 0;
    }

    private int calculateTotalWeight(int[] ints) throws IllegalArgumentException {
        int sum = 0;
        for (int val : ints) {
            if (val < 0 || val > 20) {
                throw new IllegalArgumentException("Weight should be from 0 to 20 pounds");
            }
            sum += val;
        }
        return sum;
    }
}
