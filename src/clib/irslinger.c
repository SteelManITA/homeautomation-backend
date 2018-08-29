#include <stdio.h>
#include <stdlib.h>
#include "irslinger.h"

int powi(int base, int exp);
int length(char *input);
int *stringArrayToIntArray(char *numbers[], int count);

int main(int argc, char *argv[])
{
  if (argc < 2) {
    printf("Missing parameters\n");
    return -1;
  }

  int codesCount = argc - 1;
  int* codes = stringArrayToIntArray(&argv[1], codesCount);
  // int codesCount = sizeof(codes) - sizeof(int);

  uint32_t outPin = 17;            // The Broadcom pin number the signal will be sent on
  int frequency = 38000;          // The frequency of the IR signal in Hz
  double dutyCycle = 0.5;         // The duty cycle of the IR signal. 0.5 means for every cycle,
                                  // the LED will turn on for half the cycle time, and off the other half

  int result = irSlingRaw(
    outPin,
    frequency,
    dutyCycle,
    codes,
    codesCount);

  return result;
}

int length(char *input)
{
  int len = 0;
  while(input[len] != '\0') {
    len++;
  }
  return len;
}

int powi(int base, int exp)
{
  int i, res = 1;
  for (i = 0; i < exp; ++i) {
    res *= base;
  }
  return res;
}

int *stringArrayToIntArray(char *numbers[], int count)
{
  int i, j;
  int *codes = (int*) malloc((count) * sizeof(int));

  for (i = 0; i < count; ++i) {
    int len = length(numbers[i]);
    int val = 0;
    for (j = 0; j < len; ++j) {
      val += ((int) (numbers[i][j] - 48)) * powi(10, len - (j + 1));
    }
    codes[i] = val;
    // printf("%d\n", val);
  }

  return codes;
}